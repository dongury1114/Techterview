import React, { useState, useEffect } from "react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing];
};

const Player = ({ url = 'https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3' }) => {
    const [playing] = useAudio(url);

    return (
        <div>
            <button onClick={playing}></button>
        </div>
    );
};

export default Player;
