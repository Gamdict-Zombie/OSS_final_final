import axios from "axios";

const server = 'http://apis.data.go.kr/B552881/kmooc_v2_0';
const decode_key = '9ofDr0x%2Fq%2F3VzRqe5l476yKpCUl3J1qxF9behOiF1Yt%2FhWujUspFMJFI%2B0C%2F51R1mIr%2BZyAPKMzTGZE2YhQrVw%3D%3D';
const mock_api = 'https://67296e396d5fa4901b6d1e3f.mockapi.io/my_data';

export const getLectureAPI = async (page, size) => {
    try {
        const res = await axios.get(`${server}/courseList_v2_0?ServiceKey=${decode_key}&Page=${page}&Size=${size}`);
        if (res.data?.items) {
            return res.data?.items;
        }
    } catch (err) {
        console.error(err);
    }
};

export const getLectureDetailAPI = async (CourseId) => {
    try {
        const res = await axios.get(`${server}/courseDetail_v2_0?ServiceKey=${decode_key}&CourseId=${CourseId}`);
        if (res.data?.results) {
            return res.data?.results;
        }
    } catch (err) {
        console.error(err);
    }
};

export const postDataAPI = async (data) => {
    try {
        const res = await axios.post(mock_api, data);
        if (res.data) {
            return res.data;
        }
    } catch (err) {
        console.error(err);
    }
};

//https://67296e396d5fa4901b6d1e3f.mockapi.io/my_data/courseDetail_v2_0?ServiceKey=Q4VW1efSExiJxvEWYCC4aWIEk8oQC%2BcGaJ5phhVp4lmpK0%2F0I0v6%2BKFb4RrmKXwvzY78hDM1aHmnSitjUTy6Jw%3D%3D&CourseId=${CourseId}