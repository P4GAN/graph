attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;

uniform mat4 u_matrix;

varying vec4 v_color;
varying vec3 v_normal;
    
void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
    v_color = a_color;
    v_normal = a_normal;
}