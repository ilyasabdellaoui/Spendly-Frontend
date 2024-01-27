import { useState, useRef, useEffect } from 'react';
import { createPopper } from '@popperjs/core';

const useDropdown = (buttonId) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const popperInstanceRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const createPopperInstance = () => {
      if (dropdownRef.current) {
        const dropdown = dropdownRef.current;
        const button = document.getElementById(buttonId);

        popperInstanceRef.current = createPopper(button, dropdown, {
          placement: 'bottom-start',
        });
      }
    };

    const destroyPopperInstance = () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = null;
      }
    };

    if (isDropdownOpen) {
      createPopperInstance();
    } else {
      destroyPopperInstance();
    }

    return () => {
      destroyPopperInstance();
    };
  }, [isDropdownOpen, buttonId]);

  return {
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  };
};

export default useDropdown;