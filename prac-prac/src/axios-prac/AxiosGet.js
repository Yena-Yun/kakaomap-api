import React, { useState } from 'react';
import axios from 'axios';


const AxiosGet = () => {
    const [data, setData] = useState(null);
    
    const onClick = () => {
        axios.get('http://13.125.233.80:8080/test/get')
        .then(response => {
            setData(response.data);
        });
    };

    return (
        <div>
            <div>
                <button onClick={onClick}>불러오기</button>
            </div>
            {/* JSON.stringify(value [, replacer [, space]]) -  */}
            {data &&
                <textarea rows={20} style={{ width: "300px" }}
                    value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};


export default AxiosGet;