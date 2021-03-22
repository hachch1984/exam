
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

    <div className='p-5 d-flex justify-content-center align-items-center flex-column '>

      <h6 className='display-4'>Video Cam Player</h6>

      <div style={{ width: "340px", height: "340px" }} className='card' >

        {showVideo_value &&

          <div className='card-body p-3'>
            <video ref={videoRef} style={{ filter: showGrayColor_value || showBlur_value ? (showGrayColor_value ? 'grayscale(1) ' : '') + (showBlur_value ? 'blur(5px)' : '') : undefined }}

            />
          </div>

        }

      </div>
      <div>


        <button
          className='btn btn-primary mr-3 mt-3'
          onClick={() => {
            counter_setValue(0);
            showGrayColor_setValue(false);
            showVideo_setValue(!showVideo_value);
          }}>{showVideo_value ? "hide video" : "show video"}</button>

        {showVideo_value &&
          <React.Fragment>
            <button className='btn btn-secondary mr-3 mt-3' onClick={() => {
              showGrayColor_setValue(!showGrayColor_value);

            }} >{showGrayColor_value ? 'Show natural color' : 'Show gray color'}</button>

            <button className='btn btn-secondary mr-3 mt-3' onClick={() => {
              showBlur_setValue(!showBlur_value);

            }} >{showBlur_value ? 'Hide blur efect' : 'Show Blur efect'}</button>


            <button className='btn btn-secondary mr-3 mt-3' onClick={() => {
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


        {showVideo_value && <p className='mt-3'>counter {counter_value} seconds</p>}



        <div className='mt-3 d-flex justify-content-between align-items-center'>

          <div className='mr-3'> <span className='text-muted mr-3'>Developed by:<br/>Henry Alberto Chavez Chavez  <br/><a href='https://github.com/hachch1984/exam'> GitHub </a>  </span>     </div>
          <img style={{borderRadius:'50%'}} src='https://avatars.githubusercontent.com/u/5782038?s=48&v=4' alt='developer' />
        </div>

      </div>

    </div>


  );
};

export default App;
