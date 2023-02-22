jest.mock('../Button.module.css', () => ({
  default: {
    link: 'link',
    normal: 'normal',
    button: 'button',
    container: 'container',
  },
  __esModule: true,
}));

import { render } from '../../test/test-utils';
import Button, { ButtonContainer } from '../Button';
import { screen } from '@testing-library/react';

describe('Button', () => {
  it('should render normal button', () => {
    render(<Button theme="normal" />);

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveAttribute(
      'class',
      'button normal',
    );
  });

  it('should render link button', () => {
    render(<Button theme="link" />);

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveAttribute('class', 'button link');
  });

  describe('ButtonContainer', () => {
    it('should render container', () => {
      render(
        <ButtonContainer>
          <p data-testid="test"></p>
        </ButtonContainer>,
      );

      expect(screen.getByRole('menubar')).toBeInTheDocument();

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });
  });
});
