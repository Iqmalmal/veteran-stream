import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        
            return () => {
                if (video) {
                    video.pause();
                    video.removeAttribute('src');
                    if (hls) {
                        hls.destroy();
                    }
                }
            }
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        }
    }, [src]);

    return <video ref={videoRef} controls />;
};

export default VideoPlayer;
