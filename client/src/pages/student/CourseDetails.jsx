import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        {/* <div className='absolute top-0 left-0 w-full h-96 -z-1 bg-gradient-to-b from-cyan-100/70'></div> */}
        {/* <div className="absolute inset-0 w-full min-h-[500px] -z-[1] bg-gradient-to-b from-cyan-100/70"></div> */}
        {/* <div className="absolute inset-0 w-full h-96 -z-[1] bg-gradient-to-b from-cyan-100/70"></div> */}
        {/* <div class="w-80 h-40 bg-gradient-to-r from-cyan-400 to-cyan-700 rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-bold"> */}
        {/* </div> */}
        <div class="absolute h-90 top-0 left-0 z-0 w-full bg-gradient-to-b from-cyan-100/70 to-white"></div>

        {/* Left Column */}
        <div className="max-w-x z-10 text-gray-500">
          <h1 className="home-heading-large font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* reviews and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                return (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="stars"
                    className="w-3.5 h-3.5"
                  />
                );
              })}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1
                ? " students"
                : " student"}
            </p>
          </div>
          <p className="text-sm">
            Course by
            <span className="text-blue-600 underline">Mahesh Sale</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transform-transition ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-500 cursor-pointer">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>

        {/* Right Column */}
        <div className='max-w-[424px] z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
              {/* Course Thumbnail */}
              <img src={courseData.courseThumbnail} alt="course thumbnail" />
              <div className='p-5 pb-3'>
                <div className='flex items-center gap-2'>
                  <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" />
                  <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
                </div>
              </div>
              {/* Course Price */}
              <div className='flex gap-3 items-center pl-5 pb-0 pt-0'>
                <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency} {(courseData.coursePrice - courseData.coursePrice * courseData.discount / 100).toFixed(2)}</p>
                <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData.coursePrice}</p>
                <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
              </div>

              {/* Course ratings and duration */}
              <div className='flex items-center text-sm md:text-default gap-4 pt-0 md:pt-4 text-gray-500'>
                {/* Course rating */}
                <div className='flex items-center gap-1 pl-5 pb-1'>
                  <img src={assets.star} alt="star icon" />
                  <p>{calculateRating(courseData)}</p>
                </div>

                {/* Vertical line */}
                <div className='h-4 w-px bg-gray-500/40'></div>

                {/* Course duration */}
                <div className='flex items-center gap-1 pl-1 pb-1'>
                  <img src={assets.time_clock_icon} alt="time clock icon" />
                  <p> {calculateCourseDuration(courseData)}</p>
                </div>

                {/* Vertical line */}
                <div className='h-4 w-px bg-gray-500/40'></div>

                {/* No. of lessons */}
                <div className='flex items-center gap-1 pl-1 pb-1'>
                  <img src={assets.lesson_icon} alt="lesson icon" />
                  <p>{calculateNoOfLectures(courseData)} lessons</p>
                </div>
              </div>

              {/* Enroll now button */}
              <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
        </div>
      
      
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
