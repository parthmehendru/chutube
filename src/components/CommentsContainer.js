import React from 'react'


const commentsData = [
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
                    {
                        name: 'Parth Mehendru',
                        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                        replies: [
                
                        ]
                    },
                    {
                        name: 'Parth Mehendru',
                        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                        replies: [
                
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
        
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
        
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
        
                ]
            },
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
        
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
                    {
                        name: 'Parth Mehendru',
                        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                        replies: [
                            {
                                name: 'Parth Mehendru',
                                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                                replies: [
                        
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [
            {
                name: 'Parth Mehendru',
                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                replies: [
                    {
                        name: 'Parth Mehendru',
                        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                        replies: [
                            {
                                name: 'Parth Mehendru',
                                text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                                replies: [
                                    {
                                        name: 'Parth Mehendru',
                                        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
                                        replies: [
                                
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [

        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [

        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [

        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [

        ]
    },
    {
        name: 'Parth Mehendru',
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, placeat.",
        replies: [

        ]
    }
];

const Comment = ({data}) => {
    const {name, text} = data;

    return <div className='mb-6 shadow-sm bg-gray-100 flex items-center rounded-lg p-1'>
        <img className='w-8 h-8' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />
        <div className=''>
            <p className='pl-2 font-bold'>{name}</p>
            <p className='ml-2'>{text}</p>
        </div>

    </div>
}

const CommentsList = ({comments}) => {
    return (comments.map((comment, index) => {
            return (
                <div  key={index}>
                    <Comment data={comment} />
                    <div className='pl-2 pt-2 border border-l-black ml-6'>
                        <CommentsList comments={comment.replies}/>
                    </div>
                </div>
            )
        })
    )
}

const CommentsContainer = () => {
  return (
    <div className=''>
        <CommentsList comments={commentsData}/>
    </div>
  )
}

export default CommentsContainer
