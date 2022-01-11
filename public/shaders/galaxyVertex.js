export default `
uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main () {
        // Position
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        // Rotation
        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceFromCenter = length(modelPosition.xz);
        float angleOffset = (1.0/distanceFromCenter) * uTime * 0.2;
        angle += angleOffset;
        modelPosition.x = cos(angle) * distanceFromCenter;
        modelPosition.z = sin(angle) * distanceFromCenter;

        // Randomness
        modelPosition.xyz += aRandomness;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;

        // Scale
        gl_PointSize = uSize * aScale;
        gl_PointSize *= (1.0 / -viewPosition.z);

        // Varying color
        vColor = color;
}
`;
