'use strict';

const damageRange = 0.2,
      criticalHitRate = 0.1;
let logIndex = 0,
    nowkilledNumber = 0,
    targetKillNumber = 2;

const playerDate = {
  name:'ヒロト',
  hp: 100,
  attack:6,
  defence:2
}

const enemiesDate = [
  { name:'スライム',
    hp: 40,
    attack:3,
    defence:1
  },
  {
    name:'ドラキー',
    hp: 50,
    attack:4,
    defence:2
  },
  {
    name:'キラーマシン',
    hp: 100,
    attack:5,
    defence:3
  }
];

for (let i = 0; i < enemiesDate.length; i++) {
  enemiesDate[i]["maxHp"] = enemiesDate[i]["hp"]
}

let enemyDate = enemiesDate[Math.floor(Math.random() * enemiesDate.length)];

playerDate["maxHp"] = playerDate["hp"];
enemyDate["maxHp"] = enemyDate["hp"];

function insertText(id, text){
  document.getElementById(id).textContent = text;
}

function damageCalculation(attack,defence){
  const maxDamage = attack * (1 + damageRange);
  const minDamage = attack * (1 - damageRange);
  const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);

  const damage = attackDamage - defence;
  if(damage < 1){
    return 0;
  } else {
    return damage;
  }
  return 
}

function insertlog(texts){
  const logsElement = document.getElementById('logs'),
        createLogs = document.createElement('li');
  logIndex++
  createLogs.innerHTML = logIndex+ ". " + texts;
  logsElement.insertBefore(createLogs,logsElement.firstChild);
}

function showModal(title,hiddenNextButton = false){
  document.getElementById('mask').classList.add('active');
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalTitle').textContent = title;
  if (hiddenNextButton){
    document.getElementById('modalNextButton').classList.add('hidden');
  }
}

insertText("enemyName",enemyDate["name"]);
insertText("currentEnemyHp",enemyDate["hp"]);
insertText("maxEnemyHp",enemyDate["hp"]);

insertText("playerName",playerDate["name"]);
insertText("currentPlayerHp",playerDate["hp"]);
insertText("maxplayerHp",playerDate["hp"]);

insertText("nowkilledNumber",nowkilledNumber);
insertText("targetkillsNumber",targetKillNumber);

document.getElementById('attack').addEventListener('click', function(){
let victory = false,
    defeat = false;

const playerName = '<span style="color:blue;">' + playerDate['name'] + '</span>',
      enemyName =  '<span style="color: red;">' + enemyDate['name'] + '</span>';

// 敵への攻撃
let playerDamage = damageCalculation(playerDate["attack"],enemyDate["defence"]);
  if (Math.random() < criticalHitRate){
    playerDamage *= 2;
    insertlog(playerName + "の会心の一撃！！" + enemyName + "に" + playerDamage + "のダメージ！");
  } else {
    insertlog(playerName + "の攻撃！" + enemyName + "に" + playerDamage + "のダメージ！");
  }
  enemyDate["hp"] -= playerDamage;
  insertText("currentEnemyHp",enemyDate["hp"]);
  document.getElementById('currentEnemyHpGaugeValue').style.width = (enemyDate["hp"] / enemyDate["maxHp"] * 100) + "%";
  

  if(enemyDate["hp"] <= 0){
    victory = true;

    enemyDate["hp"] = 0;
    insertText("currentEnemyHp",enemyDate["hp"]);
    document.getElementById('currentEnemyHpGaugeValue').style.width = "0%";


    showModal("ヒロトは" + enemyDate["name"] + "を倒した！");

  } 



// プレイヤーからの攻撃
if (!victory){
    let enemyDamage = damageCalculation(enemyDate["attack"],playerDate["defence"]);
    if (Math.random() < criticalHitRate){
      enemyDamage *= 2;
      insertlog(enemyName + "の会心の一撃！！" + playerName + "に" + enemyDamage + "のダメージ！");
    } else {
      insertlog(enemyName + "の攻撃！" + playerName + "に" + enemyDamage + "のダメージ！");
    }
    playerDate["hp"] -= enemyDamage;
    insertText("currentPlayerHp",playerDate["hp"]);
    document.getElementById('currentPlayerHpGaugeValue').style.width = (playerDate["hp"] / playerDate["maxHp"] * 100) + "%";
    
    
    if(playerDate["hp"] <= 0){
      defeat = true;
  
      playerDate["hp"] = 0;
      insertText("currentPlayerHp",playerDate["hp"]);
      document.getElementById('currentEnemyHpGaugeValue').style.width = 0;

      showModal("ヒロトは全滅した.....！",true);
    }
  }

  if(victory || defeat){
    this.classList.add('deactive');
  }

  if(victory){
    nowkilledNumber++;
    insertText("nowkilledNumber",nowkilledNumber);

    if (nowkilledNumber === targetKillNumber){
      showModal("モンスターは全ていなくなった.....",true);
    } 
  }
});
//   const currentEnemyHpGaugeValueAlert = (enemyDate["hp"] / enemyDate["maxHp"] * 100);
//   if(currentEnemyHpGaugeValueAlert <= 20){
//     document.getElementById('currentEnemyHpGaugeValue').style.backgroundColor = '#f00';
//   }  
//   const currentPlayerHpGaugeValueAlert = (playerDate["hp"] / playerDate["maxHp"] * 100);
//   if(currentPlayerHpGaugeValueAlert <= 20){
//     document.getElementById('currentPlayerHpGaugeValue').style.backgroundColor = '#f00';
//   }  
// });

document.getElementById('modalNextButton').addEventListener('click', function(){
  enemyDate["hp"] = enemyDate["maxHp"];
  enemyDate = enemiesDate[Math.floor(Math.random() * enemiesDate.length)];
  insertText("enemyName",enemyDate["name"]);
  insertText("currentEnemyHp",enemyDate["hp"]);
  insertText("maxEnemyHp",enemyDate["hp"]);
  document.getElementById('currentEnemyHpGaugeValue').style.width = "100%";
  

  document.getElementById('mask').classList.remove('active');
  document.getElementById('modal').classList.remove('active');
  document.getElementById('attack').classList.remove('deactive');
}) 