export function observeTarget(manager, type, target, getData) {
  return {
    subscribe(observer) {
      const backend = manager.getBackend();
      const registry = manager.getRegistry();
      const monitor = manager.getContext();
      const handle = registry.addTarget(type, target);

      function onChange() {
        const data = getData(monitor, backend, handle);
        observer.onNext(data);
      }

      monitor.addChangeListener(onChange);
      onChange();

      return {
        dispose: () => {
          monitor.removeChangeListener(onChange);
          registry.removeTarget(handle);
        }
      };
    }
  };
}

export function observeSource(manager, type, source, getData) {
  return {
    subscribe(observer) {
      const backend = manager.getBackend();
      const registry = manager.getRegistry();
      const monitor = manager.getContext();
      const handle = registry.addSource(type, source);

      function onChange() {
        const data = getData(monitor, backend, handle);
        observer.onNext(data);
      }

      monitor.addChangeListener(onChange);
      onChange();

      return {
        dispose: () => {
          monitor.removeChangeListener(onChange);
          registry.removeSource(handle);
        }
      };
    }
  };
}