import { useCountriesContext } from '../context/CountriesContext';
import { CountryGrid } from './CountryGrid';
import { EmptyState } from './EmptyState';
import { ErrorDialog } from './ErrorDialog';
import { Loader } from './Loader';

/**
 * Chooses the correct body state (loader, empty, results) and keeps the error dialog mounted.
 */
export const Content = () => {
    const { isLoading, isFetching, showEmptyState } = useCountriesContext();

    const body = (() => {
        if (isLoading || isFetching) return <Loader />;
        if (showEmptyState) return <EmptyState />;
        return <CountryGrid />;
    })();

    return (
        <div className="w-full">
            {body}
            <ErrorDialog />
        </div>
    );
};
