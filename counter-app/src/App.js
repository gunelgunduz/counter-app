import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography, LinearProgress, Switch } from "@mui/material";
import { motion } from "framer-motion"; 


const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play();
};

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const maxValue = useSelector((state) => state.maxValue);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false); 
  const [isCountingDown, setIsCountingDown] = useState(false); 
  const [resetAnimation, setResetAnimation] = useState(false); 

 
  const toggleTheme = () => setDarkMode(!darkMode);

  
  useEffect(() => {
    setProgress((counter / maxValue) * 100);
  }, [counter, maxValue]);

  
  const startCountdown = () => {
    setIsCountingDown(true);
    let current = counter;
    const interval = setInterval(() => {
      if (current > 0) {
        current -= 1;
        dispatch({ type: "DECREMENT_BY_ONE" });
      } else {
        clearInterval(interval);
        setIsCountingDown(false);
      }
    }, 1000);
  };

  
  const handleReset = () => {
    setResetAnimation(true); 
    setTimeout(() => {
      dispatch({ type: "RESET" }); 
      setResetAnimation(false); 
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#333" : "#f7f9fc",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Counter: {counter}
      </Typography>

     
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1">Switch Theme</Typography>
        <Switch checked={darkMode} onChange={toggleTheme} />
      </Box>

    
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "50%",
          height: 10,
          marginBottom: 3,
          borderRadius: 5,
          backgroundColor: "#d9d9d9",
        }}
      />

    
      <Box sx={{ display: "flex", gap: 2 }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "INCREMENT_BY_ONE" });
              playSound("/sounds/click.mp3");  
            }}
          >
            +1
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch({ type: "DECREMENT_BY_ONE" });
              playSound("/sounds/click.mp3");  
            }}
          >
            -1
          </Button>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1], 
            backgroundColor: ["#4caf50", "#81c784", "#4caf50"], 
          }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch({ type: "INCREMENT_BY_FIVE" });
              playSound("/sounds/click.mp3"); 
            }}
          >
            +5
          </Button>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1], 
            backgroundColor: ["#f44336", "#e57373", "#f44336"], 
          }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch({ type: "DECREMENT_BY_FIVE" });
              playSound("/sounds/click.mp3");  
            }}
          >
            -5
          </Button>
        </motion.div>
      </Box>

      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={startCountdown}
          disabled={isCountingDown} 
        >
          Start Countdown
        </Button>
      </motion.div>

   
      <motion.div
        animate={{ opacity: [1, 0, 1] }} 
        transition={{ duration: 1 }} 
      >
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            dispatch({ type: "RESET" });
            playSound("/sounds/reset.mp3");  
          }}
        >
          Reset
        </Button>
      </motion.div>
    </Box>
  );
}

export default App;
