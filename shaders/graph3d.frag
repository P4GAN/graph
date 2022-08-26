// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

varying vec4 v_color;
varying vec3 v_normal;

uniform vec3 u_reverseLightDirection;

void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting

    vec3 normal = normalize(v_normal);
    float direction = float(gl_FrontFacing) * 2.0 - 1.0;
    float light = dot(vec3(normal.x * direction, normal.y * direction, normal.z * direction), u_reverseLightDirection);

    gl_FragColor = v_color;
    gl_FragColor.rgb *= light;

}