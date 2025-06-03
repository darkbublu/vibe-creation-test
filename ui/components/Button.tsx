// Custom button component with consistent styling and animations

// #region Imports
import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
// #endregion

// #region Types
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}
// #endregion

// #region Styled Components
const StyledButton = styled.button<ButtonProps>`
  padding: ${props => props.size === 'small' ? '8px 16px' : props.size === 'large' ? '16px 32px' : '12px 24px'};
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => props.variant === 'primary' && `
    background: #007AFF;
    color: white;
    &:hover {
      background: #0055FF;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: #E0E0E0;
    color: #333;
    &:hover {
      background: #CCCCCC;
    }
  `}

  ${props => props.variant === 'ghost' && `
    background: transparent;
    color: #007AFF;
    &:hover {
      background: rgba(0, 122, 255, 0.1);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
// #endregion

// #region Component
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
// #endregion

export default Button; 