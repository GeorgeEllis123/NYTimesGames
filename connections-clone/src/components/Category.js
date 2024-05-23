import React from 'react';

const Category = ({ description, words }) => {
    return (
        <div className={'category'}>
            {description}
            {words.map(word => 
                word.word
            )}
        </div>
    );
};

export default Category;
