import React from 'react';

const Category = ({ description, words }) => {

    return (
        <div className={`animate__animated animate__flipInX category group${words[0].rownumber}`}>
            <p className={'ctitle'}>{description}</p>
            <p className={'cbody'}>{words.map(word => word.word).join(', ')}</p>
        </div>
    );
};

export default Category;
