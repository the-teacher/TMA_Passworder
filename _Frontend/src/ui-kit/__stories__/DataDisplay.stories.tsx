import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/data-display.scss";
import "@ui-kit/card.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/utils.scss";

const meta: Meta = {
  title: "4-UI-Kit/DataDisplay",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

export const DataDisplayExample: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <div className="card card__centered">
        <div className="card--container">
          <div className="card--header">
            <h2 className="card--title">Password Entry Details</h2>
          </div>

          <div className="card--content">
            <div className="data-display--container">
              <div className="data-display--field">
                <div className="data-display--label">Service Name</div>
                <div className="data-display--value">GitHub</div>
              </div>

              <div className="data-display--field">
                <div className="data-display--label">Username</div>
                <div className="data-display--value">johndoe123</div>
              </div>

              <div className="data-display--field">
                <div className="data-display--label">Password</div>
                <div className="data-display--value data-display__with-action">
                  <span className="data-display__monospace get-space">
                    P@ssw0rd123!
                  </span>
                  <button className="btn btn--small btn--secondary">
                    Copy
                  </button>
                  <button className="btn btn--small btn--secondary">
                    Renew
                  </button>
                </div>
              </div>

              <div className="data-display--field">
                <div className="data-display--label">Service URL</div>
                <div className="data-display--value">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="data-display__link"
                  >
                    https://github.com
                  </a>
                </div>
              </div>

              <div className="data-display--field">
                <div className="data-display--label">Notes</div>
                <div className="data-display--value data-display__multiline">
                  This is my GitHub account for work projects. Remember to
                  rotate this password every 90 days.
                </div>
              </div>
            </div>
          </div>

          <div className="data-display--actions">
            <button className="btn btn--primary">Edit</button>
            <button className="btn btn--secondary">Back</button>
          </div>

          <div className="card--footer">
            <button className="btn btn--primary">Edit</button>
            <button className="btn btn--secondary">Back</button>
          </div>
        </div>
      </div>
    </div>
  )
};
