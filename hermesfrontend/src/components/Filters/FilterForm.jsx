import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputAdornment } from "@mui/material";

export const getImageUrl = (rank) => {
  let url = "https://i.imgur.com/LVbUJes.png";
  if (rank == "Bronze") {
    url = "https://i.imgur.com/pNAGUeR.png";
  } else if (rank === "Silver") {
    url = "https://i.imgur.com/Cm5uf15.png";
  } else if (rank === "Gold") {
    url = "https://i.imgur.com/L3BmF9F.png";
  } else if (rank === "Platinum") {
    url = "https://i.imgur.com/6M3Ezca.png";
  } else if (rank === "Diamond") {
    url = "https://i.imgur.com/dtXd0Kv.png";
  } else if (rank === "Masters") {
    url = "https://i.imgur.com/2SdBQ4o.png";
  } else if (rank === "Grandmaster") {
    url = "https://i.imgur.com/uh3i4hc.png";
  } else if (rank === "Solo") {
    url = "https://i.imgur.com/WLU0Cel.png";
  } else if (rank === "Jungle") {
    url = "https://i.imgur.com/CyXnzEO.png";
  } else if (rank === "Mid") {
    url = "https://i.imgur.com/0oQkAAZ.png";
  } else if (rank === "Support") {
    url = "https://i.imgur.com/l7CD2QM.png";
  } else if (rank === "Carry") {
    url = "https://i.imgur.com/RlRTbrA.png";
  } else if (rank === "Casual") {
    url = "https://i.imgur.com/bVKJ1Az.png";
  }
  return url;
};

export default class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.filter };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.setFilter(event.target.value);
    if (this.props.rankSet) {
      this.props.rankSet("All Ranks");
    }
  }

  handleSubmit(event) {
    this.props.setFilter(this.props.patch);
    if (this.props.rankSet) {
      this.props.rankSet("All Ranks");
    }
    event.preventDefault();
  }

  render() {
    return (
      <Box sx={{ minWidth: 120, color: "white" }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white" }}>{this.props.filter}</InputLabel>
          <Select
            id="patch-filter"
            label={this.props.filter}
            onChange={this.handleChange}
            sx={{
              bgcolor: "#423f61",
              padding: "0px !important",
              margin: "0px !important",
              textAlign: "Center",
            }}
          >
            {this.props.filters.map((filter, index) => {
              return (
                <MenuItem
                  sx={{
                    marginTop: "0px",
                    backgroundColor: "#191937",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "#383864",
                    },
                    "&:active": {
                      backgroundColor: "#191937",
                    },
                  }}
                  value={filter}
                  selected
                  className=""
                  key={index}
                >
                  <div className="drop-down_icon">
                    <div style={{ position: "relative", textAlign: "center" }}>
                      <div className="god-icon">
                        <div
                          style={{
                            height: "30px",
                            width: "30px",
                          }}
                        >
                          <img
                            src={getImageUrl(filter)}
                            alt={filter.replaceAll("_", " ")}
                            style={{
                              height: "48px",
                              width: "48px",
                              transform: "scale(0.625)",
                              transformOrigin: "0px 0px 0px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <strong className="god-name" style={{ color: "white" }}>
                      {filter.replaceAll("_", " ")}
                    </strong>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export { FilterForm };
