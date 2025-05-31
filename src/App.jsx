import React, { useState, useEffect } from "react";

const App = () => {
  const [log, setLog] = useState("");
  const [state, setState] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  // Event handlers
  const handleDown = (e) => {
    setLog(`key ${e.key} pressed`);
    setState("key is down");
  };

  const handleUp = (e) => {
    setLog(`key ${e.key} pressed`);
    setState("key is up");
  };

  // Attach or detach event listeners based on isLogging
  useEffect(() => {
    if (isLogging) {
      document.addEventListener("keydown", handleDown);
      document.addEventListener("keyup", handleUp);
    } else {
      document.removeEventListener("keydown", handleDown);
      document.removeEventListener("keyup", handleUp);
      setLog("");
      setState("");
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("keydown", handleDown);
      document.removeEventListener("keyup", handleUp);
    };
  }, [isLogging]);

  // Styles as JS objects
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "10px",
      marginTop: "10px",
    },
    button: {
      margin: "20px",
      height: "35px",
      width: "200px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    disabledButton: {
      margin: "20px",
      height: "35px",
      width: "200px",
      borderRadius: "5px",
      cursor: "not-allowed",
      opacity: 0.5,
    },
    logStateBox: {
      height: "80px",
      width: "400px",
      backgroundColor: "rgb(244, 192, 5)",
      border: "2px solid black",
      margin: "20px",
      padding: "10px",
      overflowY: "auto",
      whiteSpace: "pre-wrap",
      fontFamily: "monospace",
    },
    heading: {
      border: "2px solid black",
      textAlign: "center",
      display: "inline-block",
      padding: "5px",
      borderRadius: "5px",
    },
  };

  return (
    <div>
      <div id="container" style={styles.container}>
        <h2 style={styles.heading}>KeyLogger</h2>
        <p>Don't forget to subscribe our channel</p>
        <div className="btn-container" style={styles.btnContainer}>
          <button
            id="start-btn"
            style={isLogging ? styles.disabledButton : styles.button}
            onClick={() => setIsLogging(true)}
            disabled={isLogging}
          >
            Start Logging Keypresses
          </button>
          <button
            id="stop-btn"
            style={!isLogging ? styles.disabledButton : styles.button}
            onClick={() => setIsLogging(false)}
            disabled={!isLogging}
          >
            Stop Logging Keypresses
          </button>
        </div>
      </div>
      <div className="btn-container" style={styles.btnContainer}>
        <div id="log" style={styles.logStateBox}>
          {log}
        </div>
        <div id="state" style={styles.logStateBox}>
          {state}
        </div>
      </div>
    </div>
  );
};

export default App;
