import { ShaderMaterial, ShaderLib, UniformsUtils, Uniform, Matrix4, Vector4, Texture, DoubleSide, DepthModes } from "three";

export class NMaterial extends ShaderMaterial {
    public map: Texture;

    public constructor() {
        super();

        let customUniforms = UniformsUtils.merge([
            ShaderLib.basic.uniforms,
            { _ColorMatrix: new Uniform(new Matrix4()) },
            { _ColorOffset: new Uniform(new Vector4()) }
        ]);

        this.uniforms = customUniforms;
        this.vertexShader = `
        #include <common>
        #include <uv_pars_vertex>
        #include <uv2_pars_vertex>
        #include <envmap_pars_vertex>
        varying vec4 vColor;
        attribute vec4 color;
        #include <fog_pars_vertex>
        #include <morphtarget_pars_vertex>
        #include <skinning_pars_vertex>
        #include <logdepthbuf_pars_vertex>
        #include <clipping_planes_pars_vertex>
        
        void main() {
        
            #include <uv_vertex>
            #include <uv2_vertex>

            vColor = color;

            #include <skinbase_vertex>
        
            #ifdef USE_ENVMAP
        
            #include <beginnormal_vertex>
            #include <morphnormal_vertex>
            #include <skinnormal_vertex>
            #include <defaultnormal_vertex>
        
            #endif
        
            #include <begin_vertex>
            #include <morphtarget_vertex>
            #include <skinning_vertex>
            #include <project_vertex>
            #include <logdepthbuf_vertex>
        
            #include <worldpos_vertex>
            #include <clipping_planes_vertex>
            #include <envmap_vertex>
            #include <fog_vertex>
        
        }
        `;

        this.fragmentShader = `
        uniform bool grayed;
        uniform bool filter;
        uniform mat4 colorMatrix;
        uniform vec4 colorOffset;

        uniform vec3 diffuse;
        uniform float opacity;
        #ifndef FLAT_SHADED
            varying vec3 vNormal;
        #endif
        #include <common>
        #include <dithering_pars_fragment>

        varying vec4 vColor;

        #include <uv_pars_fragment>
        #include <uv2_pars_fragment>
        #include <map_pars_fragment>
        #include <alphamap_pars_fragment>
        #include <aomap_pars_fragment>
        #include <lightmap_pars_fragment>
        #include <envmap_common_pars_fragment>
        #include <envmap_pars_fragment>
        #include <cube_uv_reflection_fragment>
        #include <fog_pars_fragment>
        #include <specularmap_pars_fragment>
        #include <logdepthbuf_pars_fragment>
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            vec4 diffuseColor = vec4( diffuse, opacity );
            #include <logdepthbuf_fragment>
            #ifdef USE_MAP
                #ifdef TEXT
                    vec4 sampleColor = texture2D( map, vUv );
                    if(vColor.a<0.1)
                        diffuseColor.a *= sampleColor.r;
                    else if(vColor.a<0.4)
                        diffuseColor.a *= sampleColor.g;
                    else
                        diffuseColor.a *= sampleColor.b;
                #else
                    #include <map_fragment>
                #endif
            #endif

            #ifdef TEXT
            diffuseColor.rgb *= vColor.rgb;
            #else
            diffuseColor *= vColor;
            #endif

            #include <alphamap_fragment>
            #include <alphatest_fragment>
            #include <specularmap_fragment>
            ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
            // accumulation (baked indirect lighting only)
            #ifdef USE_LIGHTMAP
                vec4 lightMapTexel= texture2D( lightMap, vUv2 );
                reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
            #else
                reflectedLight.indirectDiffuse += vec3( 1.0 );
            #endif
            // modulation
            #include <aomap_fragment>
            reflectedLight.indirectDiffuse *= diffuseColor.rgb;
            vec3 outgoingLight = reflectedLight.indirectDiffuse;
            #include <envmap_fragment>
            gl_FragColor = vec4( outgoingLight, diffuseColor.a );
            #include <tonemapping_fragment>
            #include <encodings_fragment>
            #include <fog_fragment>
            #include <premultiplied_alpha_fragment>
            #include <dithering_fragment>

            #ifdef GRAYED
            float grey = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            gl_FragColor.rgb = vec3(grey, grey, grey);
            #endif

            #ifdef COLOR_FILTER
            vec4 col = gl_FragColor;
            gl_FragColor.r = dot(col, _ColorMatrix[0]) + _ColorOffset.x;
            gl_FragColor.g = dot(col, _ColorMatrix[1]) + _ColorOffset.y;
            gl_FragColor.b = dot(col, _ColorMatrix[2]) + _ColorOffset.z;
            gl_FragColor.a = dot(col, _ColorMatrix[3]) + _ColorOffset.w;
            #endif
        }
        `;

        this.name = "ui-material";
        this.lights = false;
        this.transparent = true;
        this.depthTest = false;
        this.side = DoubleSide;
        //this.wireframe = true;
        this["isMeshBasicMaterial"] = true;
    }
}