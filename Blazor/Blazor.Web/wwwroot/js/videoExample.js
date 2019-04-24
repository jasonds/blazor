var Blazor = Blazor || {};

Blazor.VideoExample = (function () {

    var self = this;
    self.video = null;
    self.mediaStream = null;

    function start() {
        // Prefer camera resolution nearest to 1280x720.
        var constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                self.mediaStream = mediaStream;

                self.video = document.querySelector('video');
                self.video.srcObject = self.mediaStream;
                self.video.onloadedmetadata = function (e) {
                    self.video.play();
                };

                return true;
            })
            .catch(function (err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
    }

    function stop() {
        if (self.mediaStream) {
            self.mediaStream.getTracks().forEach(track => track.stop());
        }
    }

    return {
        Start: start,
        Stop: stop
    };
}());
