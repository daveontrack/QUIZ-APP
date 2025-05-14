import styled, { createGlobalStyle } from 'styled-components';

const gifURL = 'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Catamaran', sans-serif;
  }

  body {
    background-image: url(${gifURL});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    animation: fadeIn 1s ease-in;
  }

  * {
    box-sizing: border-box;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: 'Fascinate Inline', Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    transition: all 0.2s ease-in-out;
  }

  .start:hover,
  .next:hover {
    background: linear-gradient(180deg, #ffecdb, #f3a86d);
    transform: scale(1.05);
  }

  .start {
    max-width: 200px;
  }

  .question-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 48px;
    }

    .start, .next {
      padding: 0 20px;
      height: 35px;
    }
  }
`;

