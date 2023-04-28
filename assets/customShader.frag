// Fragment shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

//Uniforms
uniform float u_Time;
uniform float u_TimeScaleFactor;

//Varyings
varying vec2 vPosition;

//FragmentOutput
#include<helperFunctions>

//Entry point
void main(void) {

    //Length
    float output3 = length(vPosition);

    //Add
    float output2 = output3 + u_Time;

    //Multiply
    float output1 = output2 * u_TimeScaleFactor;

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