import React from 'react';

function Emotions() {
  const emotionData = [
    {
      path: './images/happy.jpg',
      label: 'happy'
    },
    {
      path: './images/sad.jpg',
      label: 'sad'
    },
    {
      path: './images/angry.jpg',
      label: 'angry'
    },
    {
      path: './images/surprise.jpg',
      label: 'surprise'
    },
    {
      path: './images/neutral.jpg',
      label: 'neutral'
    },
    {
        path: './images/neutral1.jpg',
        label: 'neutral1'
      },
      {
        path: './images/neutral2.jpg',
        label: 'neutral2'
      },

      {
        path: './images/happy1.jpg',
        label: 'happy1'
      },

      {
        path: './images/happy2.jpg',
        label: 'happy2'
      },

      {
        path: './images/sad1.jpg',
        label: 'sad1'
      },

      {
        path: './images/sad2.jpg',
        label: 'sad2'
      },

      {
        path: './images/angry1.jpg',
        label: 'angry1'
      },
      {
        path: './images/angry2.jpg',
        label: 'angry2'
      },

      {
        path: './images/surprise1.jpg',
        label: 'surprise1'
      },

      {
        path: './images/surprise2.jpg',
        label: 'surprise2'
      },
  ];

  return (
    <div>
      <h1>Emotion Images</h1>
      <ul>
        {emotionData.map((item, index) => (
          <li key={index}>
            <img src={item.path} alt={item.label} width={100} height={100} />
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Emotions;
