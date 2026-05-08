import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";


const EmberBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(() => ({
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: ["#ff9d00", "#d48e37", "#7c2d12"],
            },
            move: {
                direction: "top",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: { min: 1, max: 3},
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: { min: 0.1, max: 0.8},
                animation: {
                    enable: true,
                    speed: 4,
                    sync: false,
                },
            },
            shape: {
                type: ["circle", "triangle", "polygon"],
                options: {
                    polygon: { sides: 5},
                }
            },
            size: {
                value: {min: 1, max: 3},
                animation: {
                    enable: true,
                    speed: 3,
                    sync: false, 
                },
            },
            rotate: {
                value: { min: 0, max: 360},
                direction: "random",
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false,
                }
            }
        },
        detectRetina: true,
    }), []);

    if (init) {
        return <Particles id="tsparticles" className="bg-souls-abyss" options={options} />;
    }

  return null;
};

export default EmberBackground




