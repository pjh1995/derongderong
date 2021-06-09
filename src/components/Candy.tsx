import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
    0% {
      transform:translateY(-100%);
      opacity: 0;
    }
    5% {
      transform:translateY(-100%);
      opacity: 0;
    }
    15% {
      transform:translateY(0);
      padding-bottom: 5px;
    }
    30% {
      transform:translateY(-50%);
    }
    40% {
      transform:translateY(0%);
      padding-bottom: 6px;
    }
    50% {
      transform:translateY(-30%);
    }
    70% {
      transform:translateY(0%);
      padding-bottom: 7px;
    }
    80% {
      transform:translateY(-15%);
    }
    90% {
      transform:translateY(0%);
      padding-bottom: 8px;
    }
    95% {
      transform:translateY(-7%);
    }
    97% {
      transform:translateY(0%);
      padding-bottom: 9px;
    }
    99% {
      transform:translateY(-3%);
    }
    100% {
      transform:translateY(0);
      padding-bottom: 9px;
      opacity: 1;
    }
  `;

const WrapCandy = styled.div`
  position: absolute;
  width: fit-content;
  height: 30%;
  top: 0;
  left: 30%;
  font-size: 0.8em;
  text-align: center;
  background-color: #111;
  color: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  position: relative;
  font-weight: bold;
  animation: ${bounce} 1.8s ease-out;

  .rope {
    height: 100%;
    width: 0;
    border: 1px dotted #929292;
  }
  .candy {
    position: relative;
    i {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Candy = () => {
  return (
    <WrapCandy>
      <div className="rope">rope</div>
      <div className="candy">
        <i className="candy1"></i>
      </div>
    </WrapCandy>
  );
};
export default Candy;
