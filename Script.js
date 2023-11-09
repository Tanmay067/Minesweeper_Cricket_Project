document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const teamname1 = params.get("teamname1");
  const teamname2 = params.get("teamname2");
  const gridSize = parseInt(params.get("gridsize"));
  var teammembers = parseInt(params.get("teammembers"));
  let teamscoreID = ["teamscore1", "teamscore2"];
  let scoreID1 = ["score11", "score21"]
  let scoreID2 = ["score12", "score22"]
  let scoreID3 = ["score13", "score23"]
  let scoreID4 = ["score14", "score24"]
  let scoreID5 = ["score15", "score25"]
  let score = [0, 0, 0, 0, 0];
  let isGameOver = false;
  let target = 1000;
  var I = 0;
  var J = 0;
  let fielders = [];
  let Ones = [];
  let Twos = [];
  let Fours = [];
  let Sixes = [];
  let TeamScore = [0, 0];

  document.getElementById("teamscore1").innerHTML = `${teamname1} Score Card : ${TeamScore[0]}`;
  document.getElementById("teamscore2").innerHTML = `${teamname2} Score Card : ${TeamScore[1]}`;

  // Generate fielders
  function generateFielders(fielders) {
    while (fielders.length < 11) {
      const position = Math.floor(Math.random() * (gridSize * gridSize));
      if (!fielders.includes(position)) {
        fielders.push(position)
      }
    }
  }
  // Generate Single blocks
  function generateOnes(fielders, numones) {
    while (Ones.length < numones) {
      const position = Math.floor(Math.random() * (gridSize * gridSize));
      if (!Ones.includes(position) && !fielders.includes(position)) {
        Ones.push(position)
      }
    }
  }
  // Generate Doubles blocks
  function generateTwos(fielders, Ones, numtwos) {
    while (Twos.length < numtwos) {
      const position = Math.floor(Math.random() * (gridSize * gridSize));
      if (!Ones.includes(position) && !fielders.includes(position) && !Twos.includes(position)) {
        Twos.push(position)
      }
    }
  }
  // Generate Fours blocks
  function generateFours(fielders, Ones, Twos, numfours) {
    while (Fours.length < numfours) {
      const position = Math.floor(Math.random() * (gridSize * gridSize));
      if (!Ones.includes(position) && !Twos.includes(position) && !Fours.includes(position) && !fielders.includes(position)) {
        Fours.push(position)
      }
    }
  }
  // Generate Sixes blocks
  function generateSixes(fielders, Ones, Twos, Fours, numsixes) {
    while (Sixes.length < numsixes) {
      const position = Math.floor(Math.random() * (gridSize * gridSize));
      if (!Ones.includes(position) && !Twos.includes(position) && !Fours.includes(position) && !Sixes.includes(position) && !fielders.includes(position)) {
        Sixes.push(position)
      }
    }
  }
  //Updates team score continuously with every quick
  function updatescore(score, TeamScore, teamnameID) {
    document.getElementById(teamscoreID[J]).innerHTML = `${(J == 0) ? `${teamname1}` : `${teamname2}`} Score Card : ${TeamScore[J]}`;

    var i = 0;
    if (i <= teammembers - 1) { document.getElementById(scoreID1[J]).innerHTML = `${score[i]}`; i++; }
    if (i <= teammembers - 1) { document.getElementById(scoreID2[J]).innerHTML = `${score[i]}`; i++; }
    if (i <= teammembers - 1) { document.getElementById(scoreID3[J]).innerHTML = `${score[i]}`; i++; }
    if (i <= teammembers - 1) { document.getElementById(scoreID4[J]).innerHTML = `${score[i]}`; i++; }
    if (i <= teammembers - 1) { document.getElementById(scoreID5[J]).innerHTML = `${score[i]}`; }
  }
  // Initialize grid
  function initializeGrid() {

    fielders = [];
    Ones = [];
    Twos = [];
    Fours = [];
    Sixes = [];
    grid.innerHTML = "";
    grid.style.width = "600px";
    grid.style.height = "600px";
    // Decides the number of onees, twos , fours and sixes based on the gridsize
    if (gridSize == 6) {
      var width = 100; var numones = 10; var numtwos = 4; var numfours = 5; var numsixes = 6;
    } else if (gridSize == 7) {
      var width = 85; var numones = 8; var numtwos = 5; var numfours = 10; var numsixes = 15;
    } else if (gridSize == 8) {
      var width = 75; var numones = 8; var numtwos = 8; var numfours = 15; var numsixes = 22;
    } else if (gridSize == 10) {
      var width = 60; var numones = 17; var numtwos = 12; var numfours = 24; var numsixes = 36;
    }
    // initializing the click function for every cell of the grid
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement("tr");
      const rowData = [];
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement("td");
        cell.dataset.index = i * gridSize + j;
        cell.className = "cell";
        cell.style.width = width;
        cell.style.height = width;
        cell.addEventListener("click", handleBlockClick);
        row.appendChild(cell);
        rowData.push(cell);
      }
      grid.appendChild(row);
    }
    generateFielders(fielders);
    generateOnes(fielders, numones);
    generateTwos(fielders, Ones, numtwos);
    generateFours(fielders, Ones, Twos, numfours);
    generateSixes(fielders, Ones, Twos, Fours, numsixes);
  }
  // Handle block click event
  function handleBlockClick(event) {
    if (isGameOver) return;
    const block = event.target;
    const index = parseInt(block.dataset.index);
    // The game will run untial either you chase the target or till you lose all wickets or you beat other team
    if (TeamScore[J] < target) {
      if (fielders.includes(index)) {
        updatescore(score, TeamScore, teamscoreID);
        block.classList = 'fielder';
        block.removeEventListener("click", handleBlockClick);
        I++;
        if (I < teammembers) {
          
        } else {
          if (J == 0) {
            alert(`Now it's ${teamname2}'s turn to play`)
            Strikechange();
          }
          else { endGame(); }
        }
      }
      else if (Ones.includes(index)) {
        score[I]++;
        TeamScore[J]++;
        block.classList = 'revealed1';
        block.removeEventListener("click", handleBlockClick);
        updatescore(score, TeamScore, teamscoreID);
      }
      else if (Twos.includes(index)) {
        score[I] += 2;
        TeamScore[J] += 2;
        block.classList = 'revealed2';
        block.removeEventListener("click", handleBlockClick);
        updatescore(score, TeamScore, teamscoreID);
      }
      else if (Fours.includes(index)) {
        score[I] += 4;
        TeamScore[J] += 4;
        block.classList = 'revealed4';
        block.removeEventListener("click", handleBlockClick);
        updatescore(score, TeamScore, teamscoreID);
      }
      else if (Sixes.includes(index)) {
        score[I] += 6;
        TeamScore[J] += 6;
        block.classList = 'revealed6';
        block.removeEventListener("click", handleBlockClick);
        updatescore(score, TeamScore, teamscoreID);
      }
    }
    else {
      endGame();
    }
  }

  function Strikechange() {
    target = TeamScore[0];
    J = 1;
    I = 0;
    score = [0, 0, 0, 0, 0];
    initializeGrid();
  }

  // End the game
  function endGame() {
    isGameOver = true;
    var difference = TeamScore[1] - TeamScore[0];

    if (difference < 0) {
      alert(`${teamname1} has won the match.`)
    }
    else if (I == (teammembers - 1) && difference == 0) {
      alert(`Both teams scored equal scores`)
    }
    else {
      alert(`${teamname2} has won the match.`)
    }
    //target = TeamScore[J]
    const blocks = grid.getElementsByTagName("td");
    for (const block of blocks) {
      block.removeEventListener("click", handleBlockClick);
    }
  }

  // Start the game
  function startGame() {
    playerstable();
    initializeGrid();
  }

  function playerstable() {
    var Table = document.getElementById("card1");
    Table.innerHTML = "";
    for (var t = 1; t <= teammembers; t++) {
      let player = document.createElement("td");
      player.setAttribute('id', `player1${t}`);
      player.innerHTML = `player${t}`;
      let score = document.createElement("td");
      score.setAttribute('id', `score1${t}`);
      score.innerHTML = `0`;
      let row = document.createElement("tr");
      row.appendChild(player);
      row.appendChild(score);
      Table.appendChild(row);
    }
    var Table = document.getElementById("card2");
    Table.innerHTML = "";
    for (var t = 1; t <= teammembers; t++) {
      let player = document.createElement("td");
      player.innerHTML = `player${t}`;
      player.setAttribute('id', `player2${t}`);
      let score = document.createElement("td");
      score.setAttribute('id', `score2${t}`);
      score.innerHTML = `0`;
      let row = document.createElement("tr");
      row.appendChild(player);
      row.appendChild(score);
      Table.appendChild(row);
    }
  }
  startGame();
});