import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const appStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #a6c1ee, #fbc2eb)',
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  padding: '2rem',
  boxSizing: 'border-box'
};

const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto'
};

const headingStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
};

function App() {
  const [step, setStep] = useState('quiz');
  const [personality, setPersonality] = useState({});
  const [selectedPsychic, setSelectedPsychic] = useState(null);

  const psychics = [
    { name: 'Mystic Mara', description: 'Specializes in tarot readings and past life connections.' },
    { name: 'Intuitive Ian', description: 'Expert in aura readings and energy healing.' },
    { name: 'Clairvoyant Clara', description: 'Gifted with precognition and spiritual guidance.' },
  ];

  const handleQuizSubmit = (results) => {
    setPersonality(results);
    setStep('match');
  };

  const handlePsychicSelect = (psychic) => {
    setSelectedPsychic(psychic);
    setStep('chat');
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome to Sooth</h1>
        {step === 'quiz' && <PersonalityQuiz onSubmit={handleQuizSubmit} />}
        {step === 'match' && <PsychicMatch personality={personality} psychics={psychics} onSelect={handlePsychicSelect} />}
        {step === 'chat' && <ChatWithPsychic psychic={selectedPsychic} />}
      </div>
    </div>
  );
}

const formStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  padding: '2rem',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontSize: '1rem'
};

const buttonStyle = {
  width: '100%',
  padding: '1rem',
  borderRadius: '5px',
  border: 'none',
  background: '#ff6b6b',
  color: '#ffffff',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s ease'
};

function PersonalityQuiz({ onSubmit }) {
  const [answers, setAnswers] = useState({
    relationshipStatus: '',
    familySize: '',
    lifeGoal: '',
    childhoodMemory: '',
    familyDynamics: ''
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>Personality Quiz</h2>
      <div>
        <label htmlFor="relationshipStatus" style={{display: 'block', marginBottom: '0.5rem'}}>What is your current relationship status?</label>
        <input
          type="text"
          id="relationshipStatus"
          name="relationshipStatus"
          value={answers.relationshipStatus}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="familySize" style={{display: 'block', marginBottom: '0.5rem'}}>How many people are in your immediate family?</label>
        <input
          type="number"
          id="familySize"
          name="familySize"
          value={answers.familySize}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="lifeGoal" style={{display: 'block', marginBottom: '0.5rem'}}>What is your biggest life goal?</label>
        <textarea
          id="lifeGoal"
          name="lifeGoal"
          value={answers.lifeGoal}
          onChange={handleChange}
          style={{...inputStyle, height: '100px'}}
        />
      </div>
      <div>
        <label htmlFor="childhoodMemory" style={{display: 'block', marginBottom: '0.5rem'}}>What is your fondest childhood memory?</label>
        <textarea
          id="childhoodMemory"
          name="childhoodMemory"
          value={answers.childhoodMemory}
          onChange={handleChange}
          style={{...inputStyle, height: '100px'}}
        />
      </div>
      <div>
        <label htmlFor="familyDynamics" style={{display: 'block', marginBottom: '0.5rem'}}>How would you describe your family dynamics?</label>
        <textarea
          id="familyDynamics"
          name="familyDynamics"
          value={answers.familyDynamics}
          onChange={handleChange}
          style={{...inputStyle, height: '100px'}}
        />
      </div>
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}

const psychicCardStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '1.5rem',
  marginBottom: '1rem',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

function PsychicMatch({ personality, psychics, onSelect }) {
  return (
    <div style={formStyle}>
      <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>Your Psychic Matches</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
        {psychics.map((psychic) => (
          <div key={psychic.name} style={psychicCardStyle}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{psychic.name}</h3>
            <p style={{marginBottom: '1rem'}}>{psychic.description}</p>
            <button 
              onClick={() => onSelect(psychic)}
              style={{...buttonStyle, background: '#fbc2eb'}}
            >
              Chat with {psychic.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const chatContainerStyle = {
  ...formStyle,
  display: 'flex',
  flexDirection: 'column',
  height: '600px'
};

const messageContainerStyle = {
  flex: 1,
  overflowY: 'auto',
  marginBottom: '1rem',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '10px'
};

const messageStyle = {
  marginBottom: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  maxWidth: '70%'
};

function ChatWithPsychic({ psychic }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setIsLoading(true);
      setMessages([...messages, { text: input, sender: 'user' }]);
      
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {"role": "system", "content": `You are ${psychic.name}, a psychic with the following description: ${psychic.description}`},
              {"role": "user", "content": input}
            ]
          })
        });

        const data = await response.json();
        const psychicResponse = data.choices[0].message.content;

        setMessages(prevMessages => [...prevMessages, { text: psychicResponse, sender: 'psychic' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: "I'm sorry, I'm having trouble connecting to the spiritual realm right now. Please try again later.", sender: 'psychic' }]);
      } finally {
        setIsLoading(false);
        setInput('');
      }
    }
  };

  return (
    <div style={chatContainerStyle}>
      <h2 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>Chat with {psychic.name}</h2>
      <div style={messageContainerStyle}>
        {messages.map((message, index) => (
          <div key={index} style={{
            ...messageStyle,
            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
            background: message.sender === 'user' ? '#ff6b6b' : '#fbc2eb',
            marginLeft: message.sender === 'user' ? 'auto' : '0'
          }}>
            {message.text}
          </div>
        ))}
        {isLoading && <div style={{textAlign: 'center', fontStyle: 'italic'}}>The psychic is channeling a response...</div>}
      </div>
      <div style={{display: 'flex'}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{...inputStyle, flex: 1, marginBottom: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading}
          style={{...buttonStyle, width: 'auto', borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
