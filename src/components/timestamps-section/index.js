import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';

import './style.scss';

const TimeStampsSection = ({ timestamps }) => {
  return (
    <div className="timestamps-section-wrapper">
      <div className="timestamps-section">
        <SectionHeader title="Careers" />
        <div className="body">
          {timestamps.map((timestamp, index) =>
            index === 0 ? null : (
              <div className="timestamp" key={index}>
                <div className="date">{timestamp.date}</div>
                <div>
                  <div className="activity font-bold">
                    {timestamp.activity}&nbsp;
                    {timestamp.links && <IconButtonBar links={timestamp.links} />}
                  </div>
                  <ul className="mt-2 list-disc result-wrapper">
                    {timestamp.results &&
                      timestamp.results.map((result, index) => (
                        <li className="result" key={index}>
                          <div className="pl-3">
                            <div className="font-medium mb-2">{result.title}</div>
                            {result.url && (
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mb-2 inline-block color-"
                              >
                                {result.url}
                              </a>
                            )}
                            <div className="whitespace-pre-wrap text-base">
                              {result.description}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeStampsSection;
