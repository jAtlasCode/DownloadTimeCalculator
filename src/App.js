import React, { useState } from "react";
import "./App.css";
import {
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";

function App() {
  const initSpeedType = 'Mbps'
  const [speedCount, setSpeedCount] = useState(0);
  const [speedType, setSpeedType] = useState(initSpeedType);

  const [sizeCount, setSizeCount] = useState(0);
  const [sizeType, setSizeType] = useState("GB");
  const [calc, setCalc] = useState(null);
  const [result, setResult] = useState(null)


  const calculateTime = () => {
    // case: Mbps => GB download
    if (speedType === "Mbps" && sizeType === "GB") {
      // this gives MB/s
      const calc1 = speedCount / 8;
      // convert GB to MB
      const calc2 = sizeCount * 1024;
      // rawAnswer should always be in seconds
      const rawAnswer = calc2 / calc1;
      console.group("Calculations");
      console.log(`Raw answer => `, rawAnswer)
      console.log(`User speed choice: ${speedCount} ${speedType}`);
      console.log(`(Converted) user speed choice: ${calc1} MB/s`);
      console.log(`User DL size choice: ${sizeCount} ${sizeType}`);
      console.log("(Converted)DL size in MBs = ", calc2);
      console.groupEnd();
    
      // if over a minute, set answer in minutes
      if (rawAnswer > 60) {
        const answer = rawAnswer / 60
        const formatAnswer = `${answer} minutes`
        setResult(formatAnswer)
      // else if over an hour, set answer in hours
      } else if (rawAnswer > 3600) {
        const answer = rawAnswer / 3600
        const formatAnswer = `${answer} hours and ? minutes`
        setResult(formatAnswer)
      } else {
        const formatAnswer = `${rawAnswer} seconds`
        setResult(formatAnswer)
      }

    } else if (speedType === 'Kbps' && sizeType === 'GB') {
      // convert kb to mb
      let speedVal = speedCount * 8
      // convert to MB
      const calc1 = speedVal * 8
      // convert GB to MB
      const calc2 = speedCount * 1024
      // rawAnswer should always be in seconds
      const rawAnswer = calc2 / calc1;
      console.group("Calculations");
      console.log(`Raw answer => `, rawAnswer)
      console.log(`User speed choice: ${speedCount} ${speedType}`);
      console.log(`(Converted) user speed choice: ${calc1} MB/s`);
      console.log(`User DL size choice: ${sizeCount} ${sizeType}`);
      console.log("(Converted)DL size in MBs = ", calc2);
      console.groupEnd();

      // if over a minute, set answer in minutes
      if (rawAnswer > 60) {
        const answer = rawAnswer / 60
        const formatAnswer = `${answer} minutes`
        setResult(formatAnswer)
      // else if over an hour, set answer in hours
      } else if (rawAnswer > 3600) {
        const answer = rawAnswer / 3600
        const formatAnswer = `${answer} hours and ? minutes`
        setResult(formatAnswer)
      } else {
        const formatAnswer = `${rawAnswer} seconds`
        setResult(formatAnswer)
      }
  };

}

  const handleSubmit = () => {
    calculateTime()
  };

  const handleSpeedChange = (e) => {
    setSpeedType(e.target.value)
  }

  const handleSizeChange = (e) => {
    setSizeType(e.target.value)
  }

  return (
    <div className="App">
      <Grid
        container
        className="MainContainer"
        direction="column"
        justify="center"
        alignContent="center"
      >
        <form>
          <h2>Download Time Calculator</h2>

          <Paper>
            <h3>How fast is your internet?</h3>
            <Grid
              container
              className="NetSpeedCalc"
              direction="row"
              justify="center"
              alignContent="center"
            >
              <TextField
                type="text"
                placeholder="0"
                value={speedCount}
                onChange={(e) => setSpeedCount(e.target.value)}
                variant="outlined"
              />

              <Select label="Download Speed" value={speedType} onChange={handleSpeedChange}>
                <MenuItem value="Mbps">Mbps</MenuItem>
                <MenuItem value="Kbps">Kbps</MenuItem>
                <MenuItem value="Gbps">Gbps</MenuItem>
              </Select>
            </Grid>
          </Paper>

          <Paper>
            <h3>What is the size of the file?</h3>
            <Grid
              container
              className="DownloadSizeCalc"
              // justify="center"
              alignContent="center"
              direction="column"
            >
              <Grid item>
                <TextField
                  type="text"
                  placeholder="0"
                  value={sizeCount}
                  onChange={(e) => setSizeCount(e.target.value)}
                  variant="outlined"
                />

                <Select label="File Type" value={sizeType} onChange={handleSizeChange}>
                  <MenuItem value="KB">KB</MenuItem>
                  <MenuItem value="MB">MB</MenuItem>
                  <MenuItem value="GB">GB</MenuItem>
                  <MenuItem value="TB">TB</MenuItem>
                </Select>
              </Grid>

              <Grid item className="SubmitButtonContainer">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        <Grid item className="ResultContainer">
          <h3>Estimated Download Time: </h3>
          <h2>{result}</h2>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
