import { useState, useEffect, useRef } from 'react';

// A simple hook to determine which section is currently active in the viewport.
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Cleanup previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }
    
    // Create a new IntersectionObserver
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Options: rootMargin adjusts the "trigger point".
      // -30% from the top means a section becomes active when it's near the top of the screen.
      // 0px from the sides.
      // -50% from the bottom means a section is still "active" until half the screen has passed it.
      // This helps prevent the "About" section from becoming active too early when scrolling up from "Projects".
      { rootMargin: "-30% 0px -50% 0px" }
    );

    const { current: currentObserver } = observer;

    // Observe each section element
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        currentObserver.observe(el);
      }
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => currentObserver.disconnect();
  }, [sectionIds]); // Rerun the effect if the section IDs change

  return activeSection;
}