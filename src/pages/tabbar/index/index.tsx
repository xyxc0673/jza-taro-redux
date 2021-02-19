import Taro, { usePullDownRefresh, useShareAppMessage } from "@tarojs/taro";
import React, { useState, useEffect, useCallback } from "react";
import { View, Button, Text } from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";
import { useI18n } from "@i18n-chain/react";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import advancedFormat from 'dayjs/plugin/advancedFormat'

import {
  setMySchedule,
  setCustomSchedule,
  setAccount,
  setRecommendScheduleList,
  setRecommendSchedule,
  fetchSchollStartDate,
} from "@/store/actions/edu";
import { setUserSetting } from "@/store/actions/user";
import { setSystemInfo } from "@/store/actions/common";

import Route from "@/route";
import Edu from "@/services/edu";
import { User } from "@/services/user";
import Common from "@/services/common";

import i18n from "@/i18n";
import IDayDate from "@/interfaces/day-date";

import { ICourse } from "@/interfaces/couese";

import MagicBox from "./magic-box";
import ScheduleCard from "./schedule-card";

import BalanceCard from "./balance-card";

import "./index.scss";
import WelcomeCard from "./welcome-card";
import config from "@/utils/config";

dayjs.extend(advancedFormat)

const Index = () => {
  useI18n(i18n)

  const [schedule, setSchedule] = useState([] as Array<ICourse>);
  const [currDay, setCurrDay] = useState(0);
  const [dayDateList, setDayDateList] = useState([] as Array<IDayDate>);
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const currWeek = useSelector((state) => state.edu.currWeek);
  const mySchedule = useSelector<any, any>((state) => state.edu.mySchedule);
  const account = useSelector<any, any>((state) => state.edu.account);

  const customSchedule = useSelector<any, any>(
    (state) => state.edu.customSchedule
  );
  const recommendScheduleList = useSelector<any, any>(
    (state) => state.edu.recommendScheduleList
  );
  const [recommendRenderedScheduleList, setRenderedScheduleList] = useState(
    [] as Array<any>
  );

  useShareAppMessage(() => {
    return {
      title: i18n.shareTitle,
      path: '/pages/tabbar/index/index',
      imageUrl: config.shareImageUrl
    }
  })

  const dispatch = useDispatch();

  const getInfo = useCallback(async () => {
    const _setting = User.getSetting();
    const _mySchedule = Edu.getMySchedule();
    const _customSchedule = Edu.getCustomSchedule();
    const _systemInfo = Common.getSystemInfo();

    const _account = Taro.getStorageSync("account");
    const _recommendScheduleList = Edu.getRecommendScheduleList();

    const day = new Date().getDay();

    setCurrDay(day === 0 ? 7 : day);
    dispatch(setAccount(_account));

    dispatch(fetchSchollStartDate())
    dispatch(setMySchedule({ mySchedule: _mySchedule }));
    dispatch(setCustomSchedule({ customSchedule: _customSchedule }));
    dispatch(setSystemInfo({ systemInfo: _systemInfo }));
    dispatch(setUserSetting({ setting: _setting }));
    dispatch(
      setRecommendScheduleList({ scheduleList: _recommendScheduleList })
    );

    Taro.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#f8f8f8",
      animation: {
        duration: 50,
        timingFunc: "easeIn",
      },
    });
  }, [dispatch]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  useEffect(() => {
    const scheduleList = [] as Array<any>;

    for (const item of recommendScheduleList) {
      if (!item.pin) {
        continue;
      }
      const _daySchedule = Edu.initSchedule(
        [...item.schedule],
        currWeek,
        currDay
      );
      scheduleList.push({
        id: item.id,
        title: `${item.classValue} ${item.yearValue} ${item.semesterValue}`,
        schedule: _daySchedule,
      });
    }
    setRenderedScheduleList(scheduleList);
  }, [recommendScheduleList, currWeek, currDay]);

  useEffect(() => {
    const _dayDateList = Edu.getDayDate(currWeek);

    const _schedule = Edu.initSchedule(
      [...mySchedule, ...customSchedule],
      currWeek,
      currDay
    );
    setSchedule(_schedule);
    setDayDateList(_dayDateList);
    Taro.stopPullDownRefresh();
  }, [mySchedule, customSchedule, currWeek, currDay, timestamp]);

  usePullDownRefresh(() => {
    setTimestamp(new Date().getTime());
  });

  const navToLibrary = () => {
    Route.navTo(Route.path.libraryBookSearch);
  };

  const navToCard = () => {
    Route.navTo(Route.path.cardIndex);
  };

  const navToEdu = () => {
    Taro.switchTab({ url: Route.path.tabbarSchedule });
  };

  const navToRecommend = (id) => {
    const _schedule = recommendScheduleList.filter((item) => item.id === id);
    dispatch(setRecommendSchedule({ schedule: _schedule[0].schedule }));
    Route.navTo(Route.path.eduRecommendSchedule, {
      info: JSON.stringify({
        ..._schedule[0],
        ...{ schedule: [] },
      }),
    });
  };

  const getHello = () => {
    const date = dayjs(new Date());
    const hour = date.hour();
    if (!account.id) {
      return i18n.hello.new;
    }
    if (hour >= 6 && hour < 12) {
      return i18n.hello.morning;
    }
    if (hour >= 12 && hour < 18) {
      return i18n.hello.afternoon;
    }
    if (hour >= 18 || hour < 6) {
      return i18n.hello.evening;
    }
  };

  const isZh = i18n._.getLocaleName() === "zh"

  const helloFormat = isZh ? "MMMDo dddd" : "MMM Do dddd"

  return (
    <View className='page-index'>
      <View className='top'>
        <View className='user-info'>
          <View className='user-sayhi'>
            <Text className='hello'>{getHello()}</Text>
            <Button></Button>
          </View>
        </View>
        <View className='date'>
          {`${dayjs()
            .locale(isZh ? "zh-cn" : "en")
            .format(helloFormat)}`}
        </View>
      </View>
      <View className='panel'>
        <MagicBox />
        {(mySchedule.length === 0 && recommendScheduleList.length === 0) && (
          <WelcomeCard
            onClick={() => Route.navTo(Route.path.eduScheduleSetting)}
          />
        )}
        {/* <BalanceCard
          balance={balance}
          onClick={navToCard}
          isBinded={account.cardPwd}
        /> */}
        {(mySchedule.length !== 0 || customSchedule.length !== 0) && (
          <ScheduleCard
            schedule={schedule}
            onClick={navToEdu}
            title={i18n.tabbarIndex.scheduleCard.title}
          />
        )}
        {recommendRenderedScheduleList.map((item) => (
          <ScheduleCard
            key={item.id}
            schedule={item.schedule}
            onClick={() => navToRecommend(item.id)}
            title={item.title}
          />
        ))}
      </View>
    </View>
  );
};

Index.config = {
  enablePullDownRefresh: true,
};

export default Index;
