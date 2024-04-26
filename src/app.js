// check compatibility
if (!("BarcodeDetector" in globalThis)) {
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");

    // create new detector
    const barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });


    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }
        },
        audio: false
      });

      const videoEl = document.querySelector('#stream');
      videoEl.srcObject = stream;
      await videoEl.play();

      window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(videoEl);
        if (barcodes.length <= 0) return;
        alert(barcodes.map(barcode => barcode.rawValue));
      }, 100);

  }