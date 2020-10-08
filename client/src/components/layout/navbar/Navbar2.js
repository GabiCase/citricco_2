<Navbar bg="light" expand="lg" className="nav" onClick={() => this.hiddeSuggestion()}>

    <nav className="nav" >
        <ul className="nav__menu">
            <li className="nav__menu-item">
                <Link to="/">
                    <Navbar.Brand>Citricco-logo</Navbar.Brand>
                </Link>
            </li>
            <li className="nav__menu-item">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="nav__menu" id="basic-navbar-nav">
                    <div>Pendientes <ProductsDrop /></div>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" name="search" value={this.state.search} onChange={this.handleInputChange} />
                    </Form>
                    <Button className="nav-link btn-image"><img className="cart-img" src={search} /></Button>
                </Navbar.Collapse>
            </li>

            <li className="nav__menu-item">
                {this.props.loggedInUser ?
                    <Link className="nav-link nav__menu-item" to="/account/profile"><img className="cart-img" src={user} /><ProfileDrop /></Link>
                    :
                    <Link className="nav-link nav__menu-item" to="/account/login"><img className="cart-img" src={user} /></Link>}
            </li>

            <li className="nav__menu-item">
                <Link className="nav-link" to="/cart"><img className="cart-img" src={cart} />{this.getCartTotal()}</Link>
            </li>
        </ul>
    </nav >
</Navbar>