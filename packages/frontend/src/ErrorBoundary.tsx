import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default class ErrorBoundary extends React.Component<
  Props,
  { error: Error | null }
> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          {this.state.error.message}
        </div>
      );
    }

    return this.props.children;
  }
}
