import React from "react";
import { View, Text } from "@tarojs/components";
import { ITouchEvent } from "@tarojs/components/types/common";
import className from "classnames";
import { ICourse } from "@/interfaces/couese";
import i18n from "@/i18n";

import "./index.scss";

interface IProps {
  title: string;
  schedule: Array<ICourse>;
  onClick: (event: ITouchEvent) => any;
}

const ScheduleCard: React.FC<IProps> = (props) => {
  const { schedule = [], onClick } = props;

  return (
    <View className='comp-schedule-card'>
      {/* <View className='line'></View> */}

      <View className='container' onClick={onClick}>
        <View className='header'>
          <Text className='header-title'>{`${props.title}`}</Text>
        </View>
        <View className='schedule-list'>
          {schedule.length === 0 && (
            <Text className='empty-schedule'>
              {i18n.tabbarIndex.scheduleCard.emptyClass}
            </Text>
          )}
          {schedule.map((course, index) => {
            return (
              <View
                key={course.id}
                className={className("course-block", {
                  "course-block__active": course.isCurrTimeCourse,
                  "course-block__no-margin": index === schedule.length - 1,
                })}
              >
                <View className='course-left'>
                  <View className='course-session'>
                    <Text>{course.startTime}</Text>
                    <Text>{course.endTime}</Text>
                  </View>
                </View>
                <View className='course-divider' />
                <View className='course-right'>
                  <View className='course-name'>{course.courseName}</View>
                  <View className='course-desc'>
                    <Text className='course-location'>{course.location}</Text>
                    <Text className='course-teacher'>{course.teacher}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ScheduleCard;
