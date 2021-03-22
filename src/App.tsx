
import React, { useEffect, useRef, useState } from 'react';


const App = () => {

  const [showVideo_value, showVideo_setValue] = useState(false);
  const [counter_value, counter_setValue] = useState(0);
  const [showGrayColor_value, showGrayColor_setValue] = useState(false);
  const [showBlur_value, showBlur_setValue] = useState(false);


  const [pauseVideo_value, pauseVideo_setValue] = useState(false);

  const videoRef = useRef<any>(null);
   


  const getVideo = () => {

    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, height: 300 } })
      .then(stream => {
        let video: any = videoRef.current;
        if (video && video != null) {
          video.srcObject = stream;


          video.play();

        }
      })
      .catch(err => {
        console.error("error:", err);
      });
  };


  useEffect(() => {
    if (counter_value === 0) {
      getVideo();
    }

    let counter = setInterval(() => {
      counter_setValue(counter_value + 1);

    }, 1000)


    return () => {
      clearInterval(counter);

    }



  }, [videoRef, showVideo_value, counter_value]);


 



  return (
    <div style={{ margin: "50px 50px" }}>
      <div style={{ width: "300px", height: "300px", border: "solid 1px black" }}>
        {showVideo_value &&
          <video ref={videoRef} style={{ filter: showGrayColor_value || showBlur_value ? (showGrayColor_value ? 'grayscale(1) ' : '') + (showBlur_value ? 'blur(5px)' : '') : undefined }} />}

      </div>
      <div>


        <button
          onClick={() => {
            counter_setValue(0);
            showGrayColor_setValue(false);
            showVideo_setValue(!showVideo_value);
          }}>{showVideo_value ? "hide video" : "show video"}</button>

        {showVideo_value &&
          <React.Fragment>
            <button style={{ marginLeft: '10px' }} onClick={() => {
              showGrayColor_setValue(!showGrayColor_value);

            }} >{showGrayColor_value ? 'Show natural color' : 'Show gray color'}</button>

            <button style={{ marginLeft: '10px' }} onClick={() => {
              showBlur_setValue(!showBlur_value);

            }} >{showBlur_value ? 'Hide blur efect' : 'Show Blur efect'}</button>


            <button style={{ marginLeft: '10px' }} onClick={() => {
              if (pauseVideo_value) {
                pauseVideo_setValue(false);
                videoRef.current.play();
              } else {
                pauseVideo_setValue(true);
                videoRef.current.pause();
              }

            }} >{pauseVideo_value ? 'Continue Video' : 'Pause Video'}</button>
          </React.Fragment>

        }


        {showVideo_value && <p>counter {counter_value}</p>}


      </div>

    </div>
  );
};

export default App;
