import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, Vibration, TouchableWithoutFeedback } from 'react-native';
import Images from '../assets/index';
import Config from '../config';
import CheckBox from '@react-native-community/checkbox';


const Lane = (props) => {
  const [summoner1, setSummoner1] = useState(props.firstSummoner);
  const [summoner2, setSummoner2] = useState('flash');
  const [touchedSummoner, setTouchedSummoner] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [timerRunning1, setTimerRunning1] = useState(false);
  const [timerRunning2, setTimerRunning2] = useState(false);
  const [timer1, setTimer1] = useState(0);
  const [timer2, setTimer2] = useState(0);
  const [toggleRune, setToggleRune] = useState(false)
  const [toggleBoots, setToggleBoots] = useState(false)


  useEffect(() => {
    setTimerRunning1(false);
    setTimer1(0);
    setTimerRunning2(false);
    setTimer2(0);
  }, [props.isTimer]);

  useEffect(() => {
    let interval = null;
    if (timer1 <= 0) {
      clearInterval(interval);
      endTimer1();
    }
    if (timerRunning1) {
      interval = setInterval(() => {
        setTimer1(timer1 => timer1 - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning1, timer1]);

  useEffect(() => {
    let interval = null;
    if (timer2 <= 0) {
      clearInterval(interval);
      endTimer2();
    }
    if (timerRunning2) {
      interval = setInterval(() => {
        setTimer2(timer2 => timer2 - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning2, timer2]);



  const touched = (number, summoner) => {
    //Timer Mode
    if (props.isTimer) {
      startTimer(number, summoner)
    }
    // Select Mode
    else {
      setModalVisible(true);
      setTouchedSummoner(number);
    }
  }

  const replaceSummoner = (summonerPlace, summonerName) => {
    if (summonerPlace == 1) {
      setSummoner1(summonerName);
    }
    if (summonerPlace == 2) {
      setSummoner2(summonerName);
    }
    setModalVisible(false);
  }

  const startTimer = (number, summonerToTime) => {
    if (number === 1) {
      // Si ya está corriendo, cancelar
      if (timerRunning1 || timer1 > 0) {
        setTimerRunning1(false);
        setTimer1(0);
      } else {
        setTimerRunning1(true);
        let modifier = 1;
        if (toggleBoots) {
          modifier = modifier - .1;
        }
        if (toggleRune) {
          modifier = modifier - .05;
        }
        setTimer1(Config[summonerToTime]*modifier);
      }
    }
    if (number === 2) {
      // Si ya está corriendo, cancelar
      if (timerRunning2) {
        setTimerRunning2(false);
      } else {
        setTimerRunning2(true);
        let modifier = 1;
        if (toggleBoots) {
          modifier = modifier - .1;
        }
        if (toggleRune) {
          modifier = modifier - .05;
        }
        setTimer2(Config[summonerToTime]*modifier);
      }
    }
  }

  const endTimer1 = () => {
    Vibration.vibrate(600);
    setTimerRunning1(false);
  }

  const endTimer2 = () => {
    Vibration.vibrate(600);
    setTimerRunning2(false);
  }

  return (
    <View style={styles.screen}>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false); }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.screen}>
            <View style={styles.modal}>
              <View style={styles.modalImgsContainer}>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'barrier') }}>
                  <Image source={Images.barrier} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'cleanse') }}>
                  <Image source={Images.cleanse} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'exhaust') }}>
                  <Image source={Images.exhaust} style={styles.modalImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalImgsContainer}>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'flash') }}>
                  <Image source={Images.flash} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'ghost') }}>
                  <Image source={Images.ghost} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'heal') }}>
                  <Image source={Images.heal} style={styles.modalImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalImgsContainer}>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'ignite') }}>
                  <Image source={Images.ignite} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'smite') }}>
                  <Image source={Images.smite} style={styles.modalImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { replaceSummoner(touchedSummoner, 'teleport') }}>
                  <Image source={Images.teleport} style={styles.modalImg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.laneTitleContainer}>
        <Text style={styles.laneTitle}>{props.lane}</Text>
      </View>
      <View style={styles.lane}>
        <View style={styles.modifiers}>
          <View>
            <Image style={styles.boots}
              source={Images.boots}
            />
            <CheckBox
              disabled={false}
              value={toggleBoots}
              onValueChange={() => toggleBoots ? setToggleBoots(false) : setToggleBoots(true)}
            />
          </View>
          <View>
            <Image style={styles.rune}
              source={Images.rune}
            />
            <CheckBox
              disabled={false}
              value={toggleRune}
              onValueChange={() => toggleRune ? setToggleRune(false) : setToggleRune(true)}
            />
          </View>
        </View>
        <View style={styles.images}>
          <TouchableOpacity onPress={() => { touched(1, summoner1) }}>
            <View style={styles.image}>
              {timerRunning1 &&
                <View style={styles.imageHover}>
                  <Text style={styles.hoverText}>{timer1}</Text>
                </View>
              }
              <Image
                source={Images[summoner1]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { touched(2, summoner2) }}>
            <View style={styles.image}>
              {timerRunning2 &&
                <View style={styles.imageHover}>
                  <Text style={styles.hoverText}>{timer2}</Text>
                </View>
              }
              <Image
                source={Images[summoner2]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageHover: {
    position: 'absolute',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    width: '100%',
    height: '100%'
  },
  hoverText: {
    color: "white"
  },
  modal: {
    // flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%'
  },
  modalImgsContainer: {
    // flex: 1,
    flexDirection: 'row'
  },
  modalImg: {
    margin: 5
  },
  laneTitle: {
    fontSize: 14
  },
  lane: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rune: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  boots: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  modifiers: {
    flexDirection: 'row'
  }
});

export default Lane;