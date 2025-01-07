// Shortcode para formularios de reserva
function booking_form_shortcode($atts) {
    // Atributos del shortcode con valores predeterminados
    $atts = shortcode_atts([
        'background_color' => '#cedb50',
        'button_text_color' => '#ffffff',
        'button_background_color' => '#007bff',
        'button_hover_color' => '#0056b3',
        'icon_background_color' => '#ffc107',
        'icon_hover_color' => '#dddddd',
        'icon_text_color' => '#000000', // Nuevo atributo para color del texto dentro de los botones
        'title_color' => '#495057'
    ], $atts);

    // Generar un ID único para encapsular estilos
    $unique_id = uniqid('booking_form_');

    ob_start();
    ?>
    <div id="<?php echo esc_attr($unique_id); ?>" class="booking-modal">
        <div id="booking_form_placeholder" class="booking-container">
            <div class="booking_close_container">
                <img src="/CPM_RGB_ES_Camping_Outline.svg" alt="Logo">
                <button class="btn btn--close">&#xd7;</button>
            </div>
            <div class="booking-box">
                <div class="form-group">
                    <select class="select-category">
                        <option value="notSelected">Select Category</option>
                        <option value="rental">Rental of Accommodation</option>
                        <option value="camping">Camping</option>
                    </select>
                </div>

                <div class="arrival-departure">
                    <div class="form-group">
                        <p>Arrival Date</p>
                        <input type="date" id="arrival" name="arrival" />
                    </div>
                    <div class="form-group">
                        <p>Departure Date</p>
                        <input type="date" id="departure" name="departure" />
                    </div>
                </div>

                <div class="dropdown-container">
                    <div class="persons-btn" role="button">
                        Persons (0)
                    </div>
                    <div class="dropdown-box hidden" id="personsDropdown">
                        <div class="counter-item">
                            <div class="counter-label">
                                Adults<br>
                                <span>17+ years</span>
                            </div>
                            <div class="counter-controls">
                                <button class="btn btn--decrement btn-adult-decrement btn--cta" data-src="1">-</button>
                                <span class="counter-value counter-value--1" id="adultsCount">0</span>
                                <button class="btn btn--increment btn-adult-increment btn--cta" data-src="1">+</button>
                            </div>
                        </div>
                        <div class="counter-item">
                            <div class="counter-label">
                                Children<br>
                                <span>3-16 years</span>
                            </div>
                            <div class="counter-controls">
                                <button class="btn btn--decrement btn-children-decrement btn--cta" data-src="2">-</button>
                                <span class="counter-value counter-value--2" id="childrenCount">0</span>
                                <button class="btn btn--increment btn-children-increment btn--cta" data-src="2">+</button>
                            </div>
                        </div>
                        <div class="counter-item">
                            <div class="counter-label">
                                Babies<br>
                                <span>0-2 years</span>
                            </div>
                            <div class="counter-controls">
                                <button class="btn btn--decrement btn-babies-decrement btn--cta" data-src="3">-</button>
                                <span class="counter-value counter-value--3" id="babiesCount">0</span>
                                <button class="btn btn--increment btn-babies-increment btn--cta" data-src="3">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="search-btn">Search and Book</button>
            </div>
        </div>
    </div>
    <style>
        /* Encapsulación completa del formulario */
        #<?php echo esc_attr($unique_id); ?> {
            background-color: <?php echo esc_attr($atts['background_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .persons-btn {
            background-color: <?php echo esc_attr($atts['button_background_color']); ?>;
            color: <?php echo esc_attr($atts['button_text_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .persons-btn:hover {
            background-color: <?php echo esc_attr($atts['button_hover_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .search-btn {
            background-color: <?php echo esc_attr($atts['button_background_color']); ?>;
            color: <?php echo esc_attr($atts['button_text_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .search-btn:hover {
            background-color: <?php echo esc_attr($atts['button_hover_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .counter-controls button {
            background-color: <?php echo esc_attr($atts['icon_background_color']); ?>;
            color: <?php echo esc_attr($atts['icon_text_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> .counter-controls button:hover {
            background-color: <?php echo esc_attr($atts['icon_hover_color']); ?>;
        }
        #<?php echo esc_attr($unique_id); ?> h4 {
            color: <?php echo esc_attr($atts['title_color']); ?>;
        }
    </style>
    <?php
    return ob_get_clean();
}

add_shortcode('booking_form', 'booking_form_shortcode');
