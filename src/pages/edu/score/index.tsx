import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Icon } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import className from "classnames";
import { useI18n } from "@i18n-chain/react";

import User from "@/services/user";
import { fetchEduScore } from "@/store/actions/edu";
import SemesterPicker from "@/components/semester-picker";
import i18n from "@/i18n";
import SORT_TYPE from "@/data/enums/sort-type";
import SCORE_MODE from "@/data/enums/score-mode";
import IScore from "@/interfaces/score";
import FloatBottomModal from "@/components/float-bottom-modal";
import QuestionKit from "@/components/question-kit";

import "./index.scss";

const Score: React.FC = () => {
  useI18n(i18n)

  const [grade, setGrade] = useState("0");
  const [semester, setSemester] = useState("0");
  const [sortType, setSortType] = useState(SORT_TYPE.NORMAL);
  const [mode, setMode] = useState(SCORE_MODE.NONE);
  const [floatModalTitle, setFloatModalTitle] = useState("");
  const [floatModalVisible, setFloatModalVisible] = useState(false);
  const [floatScoreList, setFloatScoreList] = useState([] as Array<IScore>);
  const [floatLayoutVisible, setFloatLayoutVisible] = useState(false);
  const [analyzedScoreMap, setAnalyzedScoreMap] = useState({
    pass: [] as Array<IScore>,
    fail: [] as Array<IScore>,
    totalCredit: 0,
    weightedAverageScore: "",
    gpa: "",
    typeList: [] as Array<any>,
    levelList: [] as Array<any>,
  });
  const scoreList = useSelector<any, Array<IScore>>(
    (state) => state.edu.scoreList
  );
  const account = useSelector<any, any>((state) => state.edu.account);

  const dispatch = useDispatch();

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: i18n.eduScore.title });
  }, []);

  useEffect(() => {
    if (mode === SCORE_MODE.SEARCH) {
      return;
    }

    if (scoreList.length === 0) {
      return;
    }

    let totalScore: number = 0;
    let totalCredit: number = 0;
    let totalCreditPoint: number = 0;
    let courseTypeMap = {};
    let courseTypeList = [] as Array<any>;

    let levelMap = {
      A: [] as Array<IScore>,
      B: [] as Array<IScore>,
      C: [] as Array<IScore>,
      D: [] as Array<IScore>,
      E: [] as Array<IScore>,
    };
    let levelList = [] as Array<any>;

    const pass = scoreList.filter((item) => item.scoreValue >= 60);
    const fail = scoreList.filter((item) => item.scoreValue < 60);
    // const avg = scoreList.map(item => item.scoreValue).reduce((pre, curr) => (pre + curr)) / scoreList.length

    scoreList.map((item) => {
      courseTypeMap[item.courseType] = courseTypeMap[item.courseType] || [];
      courseTypeMap[item.courseType].push(item);

      const creditFloat = parseFloat(item.credit);
      const creditPointFloat = creditFloat * parseFloat(item.point);

      totalCreditPoint += creditPointFloat;
      totalCredit += creditFloat;

      totalScore += creditFloat * item.scoreValue;

      if (item.scoreValue >= 90) {
        levelMap["A"].push(item);
      } else if (item.scoreValue >= 80 && item.scoreValue < 90) {
        levelMap["B"].push(item);
      } else if (item.scoreValue >= 70 && item.scoreValue < 80) {
        levelMap["C"].push(item);
      } else if (item.scoreValue >= 60 && item.scoreValue < 70) {
        levelMap["D"].push(item);
      } else {
        levelMap["E"].push(item);
      }
    });

    Object.keys(courseTypeMap).map((k) => {
      const _totalCredit = courseTypeMap[k]
        .map((item) => parseInt(item.credit))
        .reduce((total, next) => total + next);
      courseTypeList.push({
        type: k,
        totalCredit: _totalCredit,
        scoreList: courseTypeMap[k],
      });
    });

    Object.keys(levelMap).map((k) => {
      const _totalCredit = levelMap[k]
        .map((item) => parseInt(item.credit))
        .reduce((total, next) => total + next, 0);
      levelList.push({
        type: k,
        totalCredit: _totalCredit,
        scoreList: levelMap[k],
      });
    });

    const map = {
      pass: pass,
      fail: fail,
      // avg: avg,
      totalCredit: totalCredit,
      weightedAverageScore: (totalScore / totalCredit).toFixed(2),
      gpa: (totalCreditPoint / totalCredit).toFixed(2),
      typeList: courseTypeList,
      levelList,
    };

    setAnalyzedScoreMap(map);
  }, [mode, scoreList]);

  const handleSubmit = async () => {
    await dispatch(fetchEduScore({ year: grade, semester }));
    setMode(SCORE_MODE.SEARCH);
    setFloatLayoutVisible(true);
  };

  const handlePickerClick = useCallback(() => {
    setFloatLayoutVisible(false);
  }, []);

  const handlePickerChange = useCallback((e) => {
    setGrade(User.gradeRange[e[0]].key);
    setSemester(User.semesterRange[e[1]].key);
  }, []);

  const sort = (data: Array<any>) => {
    const _data = data.concat([]);

    if (sortType === SORT_TYPE.ASC) {
      return _data.sort((a, b) => a.score - b.score);
    }

    if (sortType === SORT_TYPE.DESC) {
      return _data.sort((a, b) => b.score - a.score);
    }

    return data;
  };

  const changeSortType = () => {
    if (sortType === SORT_TYPE.NORMAL) {
      setSortType(SORT_TYPE.ASC);
    }

    if (sortType === SORT_TYPE.ASC) {
      setSortType(SORT_TYPE.DESC);
    }

    if (sortType === SORT_TYPE.DESC) {
      setSortType(SORT_TYPE.NORMAL);
    }
  };

  const shouldIHidden = scoreList.length === 0;

  const floatLayoutClass = className("float-layout", {
    "float-layout--active": !shouldIHidden && floatLayoutVisible,
  });

  const btnClass = className("btn", {
    "btn--active": shouldIHidden || !floatLayoutVisible,
  });

  const formClass = className("form", {
    "form--active": !shouldIHidden && floatLayoutVisible,
  });

  const showFloatScoreList = (list: Array<IScore>, title: string) => {
    setFloatScoreList(list);
    setFloatModalTitle(title);
    setFloatModalVisible(true);
  };

  const renderScore = (score) => {
    const scoreNumber = parseInt(score.scoreValue);
    const scoreClass = className("score", {
      "score--A": scoreNumber >= 90,
      "score--B": scoreNumber >= 80 && scoreNumber < 90,
      "score--C": scoreNumber >= 70 && scoreNumber < 80,
      "score--D": scoreNumber >= 60 && scoreNumber < 70,
      "score--E": scoreNumber < 60,
    });
    return (
      <View key={score.courseName} className={scoreClass}>
        <View className='score-left'>
          <Text className='score-value'>{score.score}</Text>
        </View>
        <View className='score-right'>
          <Text className='score-name'>{score.courseName}</Text>
          <View>
            <Text className='score-credit'>{`${i18n.eduScore.credit} ${score.credit}`}</Text>
            <Text className='score-point'>{`${i18n.eduScore.point} ${score.point}`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className='score-page'>
      <FloatBottomModal
        title={`${floatModalTitle}(${floatScoreList.length})`}
        visible={floatModalVisible}
        onClose={() => setFloatModalVisible(false)}
      >
        {floatScoreList.map((item) => renderScore(item))}
      </FloatBottomModal>
      <View className={formClass}>
        <View className='form-control'>
          <View className='semester-picker'>
            <SemesterPicker
              userId={account.id}
              onPickerChange={handlePickerChange}
              onPickerClick={handlePickerClick}
            />
            <View
              className={`semester-picker-mask ${mode === SCORE_MODE.ANALYSIS && "semester-picker-mask__active"
                }`}
            >
              <Text className='semester-picker-mask__text'>
                {i18n.eduScore.all}
              </Text>
              <Icon
                type='clear'
                onClick={() => {
                  setFloatLayoutVisible(false);
                  setMode(SCORE_MODE.SEARCH);
                }}
              />
            </View>
          </View>
          <View
            className='analyze-btn'
            onClick={async () => {
              if (mode === SCORE_MODE.SEARCH) {
                setFloatLayoutVisible(false);
                setMode(SCORE_MODE.ANALYSIS);
                await dispatch(fetchEduScore({ year: "", semester: "" }));
                setFloatLayoutVisible(true);
              } else {
                setFloatLayoutVisible(false);
                setMode(SCORE_MODE.SEARCH);
              }
            }}
          >
            {mode !== SCORE_MODE.ANALYSIS && (
              <Image
                className='analyze-icon'
                src={require("../../../assets/images/lightbulb-flash-line.svg")}
              />
            )}
            {mode === SCORE_MODE.ANALYSIS && (
              <Image
                className='analyze-icon'
                src={require("../../../assets/images/lightbulb-flash-line__active.svg")}
              />
            )}
          </View>
        </View>
        <Button className={btnClass} onClick={handleSubmit}>
          {i18n.eduScore.confirmBtn}
        </Button>
      </View>
      {(!floatLayoutVisible || scoreList.length === 0) && (
        <View className='empty-view'>
          <Image
            className='empty-view__image'
            src={require("../../../assets/images/undraw_file_analysis.svg")}
          />
          <View className='empty-tip'>
            <Text className='empty-tip__text'>
              {i18n.eduScore.emptyTipLeft}
            </Text>
            <Image
              className='empty-tip__icon'
              src={require("../../../assets/images/lightbulb-flash-line.svg")}
            />
            <Text className='empty-tip__text'>
              {i18n.eduScore.emptyTipRight}
            </Text>
          </View>
        </View>
      )}
      <View className={floatLayoutClass}>
        {mode === SCORE_MODE.ANALYSIS && (
          <View className='analysis'>
            <View className='analysis-title'>
              <Text className='analysis-title__text'>
                {i18n.eduScore.analysisTitle}
              </Text>
            </View>
            <View className='analysis-panel'>
              <View className='info-panel'>
                <View className='info-panel__header'>
                  <Text className='info-panel__header-title'>
                    {i18n.eduScore.basic}
                  </Text>
                </View>
                <View className='info-panel__body'>
                  <View
                    className='info'
                    onClick={() =>
                      showFloatScoreList(
                        analyzedScoreMap.pass,
                        i18n.eduScore.pass
                      )
                    }
                  >
                    <Text className='info-value'>
                      {analyzedScoreMap.pass.length}
                    </Text>
                    <Text className='info-title info-title__pass'>
                      {i18n.eduScore.pass}
                    </Text>
                  </View>
                  <View
                    className='info'
                    onClick={() =>
                      showFloatScoreList(
                        analyzedScoreMap.fail,
                        i18n.eduScore.fail
                      )
                    }
                  >
                    <Text className='info-value'>
                      {analyzedScoreMap.fail.length}
                    </Text>
                    <Text className='info-title info-title__fail'>
                      {i18n.eduScore.fail}
                    </Text>
                  </View>
                </View>
              </View>
              <View className='info-panel'>
                <View className='info-panel__header'>
                  <Text className='info-panel__header-title'>
                    {i18n.eduScore.advanced}
                  </Text>
                </View>
                <View className='info-panel__body'>
                  <View
                    className='info'
                    onClick={() =>
                      showFloatScoreList(scoreList, i18n.eduScore.total)
                    }
                  >
                    <Text className='info-value'>
                      {analyzedScoreMap.totalCredit}
                    </Text>
                    <Text className='info-title info-title__total'>
                      {i18n.eduScore.total}
                    </Text>
                  </View>
                  <View className='info'>
                    <Text className='info-value'>
                      {analyzedScoreMap.weightedAverageScore}
                    </Text>
                    <Text className='info-title info-title__acp'>
                      {i18n.eduScore.acp}
                    </Text>
                  </View>
                  <View className='info'>
                    <Text className='info-value'>{analyzedScoreMap.gpa}</Text>
                    <Text className='info-title info-title__gpa'>
                      {i18n.eduScore.gpa}
                    </Text>
                  </View>
                </View>
              </View>
              <View className='info-panel'>
                <View className='info-panel__header'>
                  <Text className='info-panel__header-title'>
                    {i18n.eduScore.category}
                  </Text>
                </View>
                <View className='info-panel__body'>
                  {analyzedScoreMap.typeList.map((item) => (
                    <View
                      className='info'
                      key={item.title}
                      onClick={() =>
                        showFloatScoreList(item.scoreList, item.type)
                      }
                    >
                      <Text className='info-value'>{item.totalCredit}</Text>
                      <Text className='info-title info-title__type'>
                        {`${item.type} (${item.scoreList.length}科)`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className='info-panel'>
                <View className='info-panel__header'>
                  <Text className='info-panel__header-title'>
                    {i18n.eduScore.level}
                  </Text>
                  <QuestionKit
                    size='12'
                    qaList={[
                      {
                        id: 1,
                        q: i18n.eduScore.qaList.q1,
                        a: i18n.eduScore.qaList.a1,
                      },
                    ]}
                    modalTitle={i18n.modalHelpTitle}
                    className='info-panel__header-icon'
                  />
                </View>
                <View className='info-panel__body'>
                  {analyzedScoreMap.levelList.map((item) => (
                    <View
                      className='info'
                      key={item.title}
                      onClick={() =>
                        showFloatScoreList(item.scoreList, item.type)
                      }
                    >
                      <Text className='info-value'>{item.totalCredit}</Text>
                      <Text className='info-title info-title__type'>
                        {`${item.type} (${item.scoreList.length}科)`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        {mode === SCORE_MODE.SEARCH && scoreList.length > 0 && (
          <View className='search-header'>
            <View className='search-title'>{i18n.eduScore.searchTitle({ scoreLength: scoreList.length })}</View>
            <View className='filter' onClick={changeSortType}>
              {sortType === SORT_TYPE.NORMAL && (
                <Image
                  className='sort-icon'
                  src={require("../../../assets/images/list-check.svg")}
                />
              )}
              {sortType === SORT_TYPE.ASC && (
                <Image
                  className='sort-icon sort-icon__active'
                  src={require("../../../assets/images/sort-asc__active.svg")}
                />
              )}
              {sortType === SORT_TYPE.DESC && (
                <Image
                  className='sort-icon sort-icon__active'
                  src={require("../../../assets/images/sort-desc__active.svg")}
                />
              )}
            </View>
          </View>
        )}
        {mode === SCORE_MODE.SEARCH && (
          <View className='score-list'>
            {sort(scoreList).map((item) => renderScore(item))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Score;
