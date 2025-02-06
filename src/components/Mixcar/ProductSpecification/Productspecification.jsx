import React, { useState, useEffect } from 'react';
import wooCommerceApi from '@/src/utils/WooComerce'; // Ensure the utility file path is correct

const ProductSpecification = ({ productId, product, acfData }) => {
  const [error, setError] = useState(null);

  // Function to fetch data with error handling
  const fetchData = async (endpoint) => {
    try {
      const response = await wooCommerceApi.get(endpoint);
      return response.data; // Return only the data
    } catch (err) {
      setError('Error fetching data. Please try again.');
      return null;
    }
  };

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        const data = await fetchData(`wc/v3/products/${productId}`);
        if (data) {
          // Update product and acfData props
          product = data;
          acfData = data.acf || {};
        } else {
          acfData = {};
        }
      };
      fetchProductData();
    }
  }, [productId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="car-details-area mb-50">
      <div className="container">
        <div className="title mb-20">
          <h5>Specification</h5>
        </div>
        <div className="row">
          {/* One Column Layout for Engine Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="engineHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#engineCollapse"
                  aria-expanded="false"
                  aria-controls="engineCollapse"
                >
                  Engine
                </button>
              </h2>
              <div
                id="engineCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="engineHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Displacement (L): {acfData.displacement_l}</p>
                    </li>
                    <li>
                      <p>Engine Type: {acfData.engine_type}</p>
                    </li>
                    <li>
                      <p>Engine System: {acfData.engine_system}</p>
                    </li>
                    <li>
                      <p>Valve Train: {acfData.valve_train}</p>
                    </li>
                    <li>
                      <p>Maximum Power: {acfData.maximum_power}</p>
                    </li>
                    <li>
                      <p>Torque: {acfData.torque}</p>
                    </li>
                    <li>
                      <p>Fuel Economy: {acfData.fuel_economy}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End One Column Layout for Engine Specifications */}
          {/* Two Column Layout for Exterior Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Exterior
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Daytime Running Lights: {acfData.daytime_running_lights}</p>
                    </li>
                    <li>
                      <p>Head Lights: {acfData.head_lights}</p> 
                    </li>
                    <li>
                      <p>Fog Lights: {acfData.fog_lights}</p>
                    </li>
                    <li>
                      <p>Smart Entry System: {acfData.transmission_type}</p>
                    </li>
                    <li>
                      <p>Rear Parking Sensors: {acfData.rear_parking_sensors}</p>
                    </li>
                    <li>
                      <p>One-touch Electric Sunroof: {acfData.one_touch_electric_sunroof}</p>
                    </li>
                    <li>
                      <p>Power Side Mirrors: {acfData.power_side_mirrors}</p>
                    </li>
                    <li>
                      <p>Rear LED Lights: {acfData.rear_led_lights}</p>
                    </li>
                    <li>
                      <p>Rear Spoiler: {acfData.rear_spoiler}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Exterior Specifications */}
          {/* Two Column Layout for Transmission Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Transmission
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Transmission: {acfData.transmission}</p>
                    </li>
                    <li>
                      <p>Steering Gear Shift: {acfData.steering_gear_shift}</p>
                    </li>
                    <li>
                      <p>Transmission Paddle: {acfData.transmission_paddle}</p>
                    </li>
                    <li>
                      <p>Driving mode:{acfData.driving_mode}</p> 
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Transmission Specifications */}
          {/* Two Column Layout for Ease And Comfort Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Ease And Comfort
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Remote Engine Start: {acfData.remote_engine_start}</p>
                    </li>
                    <li>
                      <p>Electric Hand Brake: {acfData.electric_hand_brake}</p>
                    </li>
                    <li>
                      <p>Air conditioning vents in the second row of seats: {acfData.air_conditioning_vents_in_the_second_row_of_seats}</p>
                    </li>
                    <li>
                      <p>Button to start the engine: {acfData.button_to_start_the_engine}</p>
                    </li>
                    <li>
                      <p>Cruise Control: {acfData.cruise_control}</p>
                    </li>
                    <li>
                      <p>Leather-wrapped Steering Wheel: {acfData.leather_wrapped_steering_wheel}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Ease And Comfort Specifications */}
          {/* Two Column Layout for Measurements Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Measurements
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Type: {acfData.type}</p>
                    </li>
                    <li>
                      <p>Wheels: {acfData.wheels}</p>
                    </li>
                    <li>
                      <p>Steering Wheel: {acfData.steering_wheel}</p>
                    </li>
                    <li>
                      <p>Seating Capacity: {acfData.seating_capacity}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Measurements Specifications */}
          {/* Two Column Layout for Seating Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Seating
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Seats Upholstery: {acfData.seats_upholstery}</p>
                    </li>
                    <li>
                      <p>Driver's Seat Height Adjustment: {acfData.drivers_seat_height_adjustment}</p>
                    </li>
                    <li>
                      <p>Front Passenger's Seat Height Adjustment: {acfData.front_passengers_seat_height_adjustment}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Seating Specifications */}
          {/* Two Column Layout for Audio And Communication System Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Audio And Communication System
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>LED Screen: {acfData.led_screen}</p> 
                    </li>
                    <li>
                      <p>No. of Speakers: {acfData.no_of_speakers}</p>
                    </li>
                    <li>
                      <p>Bluetooth: {acfData.bluetooth}</p>
                    </li>
                    <li>
                      <p>USB Audio Interface: {acfData.usb_audio_interface}</p>
                    </li>
                    <li>
                      <p>Apple CarPlay and Android Auto system: {acfData.apple_carplay_and_android_auto_system}</p>
                    </li>
                    <li>
                      <p>Wireless Charger For Cell Phone: {acfData.wireless_charger_for_cell_phone}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Audio And Communication System Specifications */}
          {/* Two Column Layout for Safety Specifications */}
          <div className="col-md-6 mb-10">
            <div className="accordion-item">
              <h2 className="accordion-header" id="transmissionHeader">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#transmissionCollapse"
                  aria-expanded="false"
                  aria-controls="transmissionCollapse"
                >
                  Safety
                </button>
              </h2>
              <div
                id="transmissionCollapse"
                className="accordion-collapse collapse"
                aria-labelledby="transmissionHeader"
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <p>Front Airbags: {acfData.front_airbags}</p>
                    </li>
                    <li>
                      <p>Front Side Airbags: {acfData.front_side_airbags}</p>
                    </li>
                    <li>
                      <p>Side Curtain Airbags: {acfData.side_curtain_airbags}</p>
                    </li>
                    <li>
                      <p>Rear view camera multi-angle: {acfData.rear_view_camera_multi_angle}</p>
                    </li>
                    <li>
                      <p>Vehicle Stability Assist™ VSA®: {acfData.vehicle_stability_assist}</p>
                    </li>
                    <li>
                      <p>Anti-lock Braking System ABS: {acfData.anti_lock_braking_system_abs}</p>
                    </li>
                    <li>
                      <p>Electronic Brakeforce Distribution EBD: {acfData.electronic_brake_force_distribution_ebd}</p>
                    </li>
                    <li>
                      <p>Tire Pressure Monitoring System TPMS: {acfData.tire_pressure_monitoring_system_tpms}</p>
                    </li>
                    <li>
                      <p>Hill Start Assist Control HAC: {acfData.hill_start_assist_control_hac}</p>
                    </li>
                    <li>
                      <p>Compatible Engineering™ ACE™ body structure {acfData.compatible_engineering_ace_body_structure}</p>
                    </li>
                    <li>
                      <p>Track Monitoring System LMS: {acfData.track_monitoring_system_lms}</p>
                    </li>
                    <li>
                      <p>Display information on the windshield: {acfData.display_information_on_the_windshield}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End Two Column Layout for Safety Specifications */}
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;