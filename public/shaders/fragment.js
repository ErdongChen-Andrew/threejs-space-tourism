export default `precision mediump float;

uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main () {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= abs(sin(vElevation * 0.5)) + 0.2;
    gl_FragColor = textureColor;
}`;
