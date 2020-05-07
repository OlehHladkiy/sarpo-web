import React from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

interface PasswordBarProps {
  password: string;
}

const PasswordBar: React.FunctionComponent<PasswordBarProps> = ({
  password,
}: PasswordBarProps) => (
  <PasswordStrengthBar
    barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#26c281']}
    shortScoreWord=""
    scoreWords={['Weak', 'Weak', 'Okay', 'Good', 'Strong']}
    password={password || ''}
  />
);

export default PasswordBar;
