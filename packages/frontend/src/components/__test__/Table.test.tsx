import { render } from '../../test/test-utils';
import Table from '../Table';
import { screen } from '@testing-library/react';

describe('Table', () => {
  it('should render table with header and body', () => {
    render(
      <Table<{ a: string }>
        rows={[{ a: 'one' }, { a: 'two' }]}
        header={[<div>Column</div>]}
        toRow={(r) => [r.a]}
        getRowKey={(r) => r.a}
      />,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader')).toHaveTextContent(/^Column$/);
    expect(screen.getAllByRole('row')).toHaveLength(3);

    const [, firstRow, secondRow] = screen.getAllByRole('row');

    expect(firstRow).toHaveTextContent(/^one$/);
    expect(secondRow).toHaveTextContent(/^two$/);
  });
});
