import React, { useState } from 'react';
import axios from 'axios';


const AxiosPost = () => {
    const [data, setData] = useState(null);

    let postdata = {
                    "title": "테스트타이틀",
                    "content": "테스트컨텐츠"
                }

    const onClick = () => {
        axios.post('http://13.125.233.80:8080/test/post',
            JSON.stringify(postdata), {
            headers: {
                "Content-Type": `application/json`,
            },
        })
        .then(response => {
            setData(response.data)
        });
    };

    return (
        <div>
            <div>
                <button onClick={onClick}>불러오기</button>
            </div>
            {data &&
                <textarea rows={20} style={{ width: "300px" }}
                    value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};


export default AxiosPost;