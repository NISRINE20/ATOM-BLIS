import { useState, useEffect } from 'react';

const useConsolePasscode = (correctPasscode, onPasscodeCorrect) => {
  const [isPasscodeCorrect, setIsPasscodeCorrect] = useState(false);

  useEffect(() => {
    const promptPasscode = () => {
      let input = '';
      while (input !== correctPasscode) {
        input = prompt('Enter passcode:');
        if (input === correctPasscode) {
          setIsPasscodeCorrect(true);
          onPasscodeCorrect();
          break;
        } else {
          console.log('Incorrect passcode');
        }
      }
    };

    promptPasscode();
  }, [correctPasscode, onPasscodeCorrect]);

  return isPasscodeCorrect;
};

export default useConsolePasscode;