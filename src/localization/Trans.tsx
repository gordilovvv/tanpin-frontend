import { Trans as TransI18Next, TransProps } from 'react-i18next';
import { Namespace, ParseKeys, TOptions } from 'i18next';
import { namespace } from './config';

export function Trans<
    Key extends ParseKeys<Ns, TOpt, KPrefix>,
    Ns extends Namespace,
    TOpt extends TOptions,
    KPrefix = undefined,
    E = React.HTMLProps<HTMLDivElement>,
>({ children, ...props }: Omit<TransProps<Key, Ns, TOpt, KPrefix, E>, 'namespace'>): React.ReactElement {
    return <TransI18Next
        ns={namespace}
        {...props}
    >
        {children}
    </TransI18Next>;
}