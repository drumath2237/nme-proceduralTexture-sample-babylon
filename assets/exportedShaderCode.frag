// Vertex shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

//Attributes
attribute vec2 position;

//Uniforms
uniform float u_Time;
uniform float u_Float;

//Varyings
varying vec2 v_position;

//Constants
float u_Constant = 1.0;

//Entry point
void main(void) {

//Position3D
    vec4 xyzw = vec4(position, 0.0, u_Constant).xyzw;

//VertexOutput
    gl_Position = xyzw;
    v_position = position;

}

// Fragment shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

//Uniforms
uniform float u_Time;
uniform float u_Float;

//Varyings
varying vec2 v_position;

//FragmentOutput
#include<helperFunctions>

//Constants
float u_Constant = 1.0;

//Entry point
void main(void) {

//Length
    float output3 = length(v_position);

//Add
    float output2 = output3 + u_Time;

//Multiply
    float output1 = output2 * u_Float;

//Sin
    float output0 = sin(output1);

//VectorMerger
    vec3 xyz1 = vec3(output0, 0.0, output0).xyz;

//FragmentOutput
    gl_FragColor = vec4(xyz1, 1.0);
#ifdef CONVERTTOLINEAR0
    gl_FragColor = toLinearSpace(gl_FragColor);
#endif
#ifdef CONVERTTOGAMMA0
    gl_FragColor = toGammaSpace(gl_FragColor);
#endif

}