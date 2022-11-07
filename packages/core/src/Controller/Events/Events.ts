import { EventEmitter } from './EventEmitter';
import { EventEmitterSelective } from './EventEmitterSelective';
import {
  CacheDescriptorWithKey,
  KeyDescriptorInternal,
  ListenerHandler,
  TolgeeOn,
} from '../../types';

export const Events = (
  getFallbackNs: () => string[],
  getDefaultNs: () => string
) => {
  const onPendingLanguageChange = EventEmitter<string>();
  const onLanguageChange = EventEmitter<string>();
  const onKeyChange = EventEmitter<KeyDescriptorInternal>();
  const onLoadingChange = EventEmitter<boolean>();
  const onFetchingChange = EventEmitter<boolean>();
  const onInitialLoaded = EventEmitter<void>();
  const onKeyUpdate = EventEmitterSelective(getFallbackNs, getDefaultNs);
  const onCacheChange = EventEmitter<CacheDescriptorWithKey>();
  const onRunningChange = EventEmitter<boolean>();

  onInitialLoaded.listen(() => onKeyUpdate.emit());
  onLanguageChange.listen(() => onKeyUpdate.emit());
  onCacheChange.listen(({ value }) => {
    onKeyUpdate.emit({ ns: [value.namespace], key: value.key }, true);
  });

  const on: TolgeeOn = (event, handler): any => {
    switch (event) {
      case 'pendingLanguage':
        return onPendingLanguageChange.listen(
          handler as ListenerHandler<string>
        );
      case 'language':
        return onLanguageChange.listen(handler as ListenerHandler<string>);
      case 'loading':
        return onLoadingChange.listen(handler as ListenerHandler<boolean>);
      case 'fetching':
        return onFetchingChange.listen(handler as ListenerHandler<boolean>);
      case 'initialLoad':
        return onInitialLoaded.listen(handler as ListenerHandler<void>);
      case 'running':
        return onRunningChange.listen(handler as ListenerHandler<boolean>);
      case 'cache':
        return onCacheChange.listen(
          handler as ListenerHandler<CacheDescriptorWithKey>
        );
      case 'keyUpdate':
        return onKeyUpdate.listen(handler as ListenerHandler<void>);
    }
  };

  return Object.freeze({
    onPendingLanguageChange,
    onLanguageChange,
    onKeyChange,
    onKeyUpdate,
    onLoadingChange,
    onFetchingChange,
    onInitialLoaded,
    onRunningChange,
    onCacheChange,
    on,
  });
};

export type EventServiceType = ReturnType<typeof Events>;
