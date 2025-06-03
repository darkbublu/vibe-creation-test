// Icon button component with various sizes and variants

// #region Imports
import React from 'react';
import styled from '@emotion/styled';
// #endregion

// #region Types
interface IconButtonProps {
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}
// #endregion

// #region Styled Components
const StyledIconButton = styled.button<Omit<IconButtonProps, 'icon'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  // Size variations
  ${props => {
    switch (props.size) {
      case 'small':
        return 'width: 32px; height: 32px;';
      case 'large':
        return 'width: 48px; height: 48px;';
      default:
        return 'width: 40px; height: 40px;';
    }
  }}

  // Variant styles
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #007AFF;
          color: white;
          &:hover { background: #0055FF; }
        `;
      case 'secondary':
        return `
          background: #E0E0E0;
          color: #333;
          &:hover { background: #CCCCCC; }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #007AFF;
          &:hover { background: rgba(0, 122, 255, 0.1); }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span<{ size?: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: ${props => props.size === 'small' ? '16px' : props.size === 'large' ? '24px' : '20px'};
    height: ${props => props.size === 'small' ? '16px' : props.size === 'large' ? '24px' : '20px'};
  }
`;
// #endregion

// #region Component
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'medium',
  variant = 'primary',
  onClick,
  disabled = false,
  label,
}) => {
  return (
    <StyledIconButton
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <IconWrapper size={size}>
        {icon}
      </IconWrapper>
    </StyledIconButton>
  );
};
// #endregion

export default IconButton; 