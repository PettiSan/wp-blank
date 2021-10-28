<?php
//Remove admin bar
show_admin_bar(false);

//Remove Meta wp generetor
remove_action('wp_head', 'wp_generator');

//Remove Emoji
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

//Remove RSD
remove_action('wp_head', 'rsd_link');

//Remove wlwmanifest
remove_action('wp_head', 'wlwmanifest_link');


//Remove wp-embed.min.js
function my_deregister_scripts()
{
	wp_deregister_script('wp-embed');
}

add_action('wp_footer', 'my_deregister_scripts');

/* GET specific custom field from post */
add_action('wp_head', 'myplugin_ajaxurl');

function myplugin_ajaxurl()
{
	echo '<script type="text/javascript">var lang = "' . apply_filters('wpml_current_language', NULL) . '"; var ajaxurl = "' . admin_url('admin-ajax.php') . '"; var base_url = "' . get_site_url() . '"; </script>';
}

//Remove jquery wp-head
function load_jquery()
{
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_enqueue_script('jquery');
	}
}

add_action('template_redirect', 'load_jquery');

//Add suport thumbnail
add_theme_support('post-thumbnails');

//Registro scripts e css
function dadobier_scripts()
{
	//JS
	wp_enqueue_script('main-js', get_template_directory_uri() . '/build/js/app.js', array(), '1.0.0', true);

	//CSS
	wp_enqueue_style('slick-css', '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css', array(), '1.8.1');
	wp_enqueue_style('main-css', get_template_directory_uri() . '/build/css/main.min.css', array(), '1.0');
}

add_action('wp_enqueue_scripts', 'dadobier_scripts');

function cc_mime_types($mimes)
{
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
}

add_filter('upload_mimes', 'cc_mime_types');

function excerpt($limit)
{
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt) >= $limit) {
		array_pop($excerpt);
		$excerpt = implode(" ", $excerpt) . '...';
	} else {
		$excerpt = implode(" ", $excerpt);
	}
	$excerpt = preg_replace('`[[^]]*]`', '', $excerpt);
	return $excerpt;
}

add_action('excerpt', 'excerpt');


//Pagination
function wordpress_pagination()
{
	global $wp_query;

	$big = 999999999;

	echo paginate_links(array(
		'base'    => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
		'format'  => '?paged=%#%',
		'current' => max(1, get_query_var('paged')),
		'total'   => $wp_query->max_num_pages,
		'prev_text'          => '<div class="arrow block large white left"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15L1 7.99998L9 1.00002" stroke="#ffffff" /></svg></div>',
		'next_text'          => '<div class="arrow block large white right"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 15L9 7.99998L1 1.00002" stroke="#ffffff" /></svg></div>',
	));
}

// Header and Footer
register_nav_menus(array(
	'header_menu' => 'Menu cabeçalho',
	'header_menu_mobile' => 'Menu cabeçalho mobile',
	'footer_menu' => 'Menu rodapé',
	'footer_menu_2' => 'Menu rodapé 2',
	'footer_menu_3' => 'Menu Sub Footer',
	'social_links' => 'Redes Sociais',
	'main_header_menu' => 'Menu nav',
));

//Body Class for Page Slug
function add_slug_body_class($classes)
{
	if (is_single()) {
		global $post;
		if (isset($post)) {
			$classes[] = $post->post_type . '-slug-' . $post->post_name;
		}
		return $classes;
	}
}
add_filter('body_class', 'add_slug_body_class');

add_action('wp_enqueue_scripts', 'secure_enqueue_script');
function secure_enqueue_script()
{
	wp_register_script('secure-ajax-access', esc_url(add_query_arg(array('js_global' => 1), site_url())));
	wp_enqueue_script('secure-ajax-access');
}

add_action('template_redirect', 'javascript_vars');

function javascript_vars()
{
	if (!isset($_GET['js_global'])) return;

	$posts_nonce = wp_create_nonce('posts_nonce');
	$count_posts = wp_count_posts('post');
	$total_pages = $count_posts->publish;

	$vars_javascript = array(
		'posts_nonce' => $posts_nonce,
		'total_pages' => $total_pages,
		'xhr_url'             => admin_url('admin-ajax.php')
	);

	$new_array = array();
	foreach ($vars_javascript as $var => $value) $new_array[] = esc_js($var) . " : '" . esc_js($value) . "'";

	header("Content-type: application/x-javascript");
	printf('var %s = {%s};', 'js_global', implode(',', $new_array));
	exit;
}

if (!defined('LANGUAGE_CODE_SUFIX')) {
	$my_current_lang = apply_filters('wpml_current_language', NULL);
	if ($my_current_lang == 'pt_BR') $my_current_lang = ''; // do not add sufix for main language
	define('LANGUAGE_CODE_SUFIX', $my_current_lang);
}

add_action('wp_ajax_load_posts_by_ajax', 'load_posts_by_ajax');
add_action('wp_ajax_nopriv_load_posts_by_ajax', 'load_posts_by_ajax');

if (function_exists('acf_add_options_page')) {

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações',
		'parent_slug'     => 'edit.php?post_type=download_posts',
		'capability' => 'edit_others_posts',
		'post_id' => 'download_posts' . LANGUAGE_CODE_SUFIX
	));

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações de Produtos',
		'parent_slug'     => 'edit.php?post_type=products',
		'capability' => 'edit_others_posts',
		'post_id' => 'products' . LANGUAGE_CODE_SUFIX
	));

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações de Sobre e Cotação',
		'parent_slug'     => 'edit.php?post_type=about-and-price',
		'capability' => 'edit_others_posts',
		'post_id' => 'about-and-price' . LANGUAGE_CODE_SUFIX
	));

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações de FAQ',
		'parent_slug'     => 'edit.php?post_type=faq',
		'capability' => 'edit_others_posts',
		'post_id' => 'faq' . LANGUAGE_CODE_SUFIX
	));

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações do Mapa',
		'parent_slug'     => 'edit.php?post_type=map',
		'capability' => 'edit_others_posts',
		'post_id' => 'map' . LANGUAGE_CODE_SUFIX
	));

	acf_add_options_sub_page(array(
		'page_title'      => 'Configurações de Notícias',
		'parent_slug'     => 'edit.php?post_type=news',
		'capability' => 'edit_others_posts',
		'post_id' => 'news' . LANGUAGE_CODE_SUFIX
	));
}

function remove_menu()
{
	remove_menu_page('edit.php');
	remove_menu_page('edit-comments.php');
}

add_action('admin_menu', 'remove_menu');

add_filter('acf/location/rule_types', 'acf_location_rules_types', 999);
function acf_location_rules_types($choices)
{
	// create a new group for the rules called Terms
	// if it does not already exist
	if (!isset($choices['Mercado e Produtos'])) {
		$choices['Mercado e Produtos'] = array();
	}
	// create new rule type in the new group
	$choices['Mercado e Produtos']['category_id'] = 'Categoria';
	return $choices;
}

add_filter('acf/location/rule_values/category_id', 'acf_location_rules_values_category');
function acf_location_rules_values_category($choices)
{
	// get terms and build choices
	$taxonomy = 'products_category';
	$args = array('hide_empty' => false);
	$terms = get_terms($taxonomy, $args);
	if (count($terms)) {
		foreach ($terms as $term) {
			$choices[$term->term_id] = $term->name;
		}
	}
	return $choices;
}

add_filter('acf/location/rule_match/category_id', 'acf_location_rules_match_category', 10, 3);
function acf_location_rules_match_category($match, $rule, $options)
{
	$term_id = array_key_exists('tag_ID', $_GET) ? $_GET['tag_ID'] : 0;
	$selected_term = $rule['value'];
	if ($rule['operator'] == '==') {
		$match = ($selected_term == $term_id);
	} elseif ($rule['operator'] == '!=') {
		$match = ($selected_term != $term_id);
	}
	return $match;
}

function my_cptui_change_posts_per_page($query)
{
	if (is_admin() || !$query->is_main_query()) {
		return;
	}

	if (is_post_type_archive('download_posts') || is_tax('downloads_filter')) {
		$query->set('posts_per_page', 12);
	}
}
add_filter('pre_get_posts', 'my_cptui_change_posts_per_page');
